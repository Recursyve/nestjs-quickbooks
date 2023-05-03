import { Controller, Get, Header, Param, Patch, Put, Res } from "@nestjs/common";
import * as fs from "fs/promises";
import * as path from "path";
import { lastValueFrom } from "rxjs";
import {
    Op,
    QuickBooksAttachablesService,
    QuickBooksAttachablesUploadResponseModel, QuickBooksEstimatesService,
    QuickBooksInvoicesService, QuickBooksPaymentsService
} from "../../../lib";

@Controller("invoice")
export class InvoicesController {
    constructor(
        private readonly attachablesService: QuickBooksAttachablesService,
        private readonly estimatesService: QuickBooksEstimatesService,
        private readonly invoicesService: QuickBooksInvoicesService,
        private readonly paymentsService: QuickBooksPaymentsService,
    ) {}

    @Get()
    public async getAll() {
        return (await this.invoicesService.withDefaultCompany()).query({
            /*MetaData: {
                LastUpdatedTime: {
                    [Op.gt]: "2015-03-01"
                }
            }*/
        }).toPromise().then(x => x.QueryResponse.Invoice);
    }

    @Get("pdf/:id")
    @Header("Content-Type", "application/pdf")
    public async getPdf(@Param("id") id: string, @Res() res): Promise<Buffer> {
        return (await this.invoicesService.withDefaultCompany()).getPdf(id).toPromise();
    }

    @Put(":id/attachable")
    public async uploadAttachable(@Param("id") id: string): Promise<QuickBooksAttachablesUploadResponseModel> {
        const attService = await this.attachablesService.withDefaultCompany();
        const file = await fs.readFile(path.join(__dirname, "../../../../", "test.pdf"));
        return lastValueFrom(attService.upload({
            FileName: "worklog.pdf",
            ContentType: "application/pdf",
            File: file,
            AttachableRef: [
                {
                    IncludeOnSend: true,
                    EntityRef: {
                        type: "Invoice",
                        value: id
                    }
                }
            ]
        }));
    }

    @Patch(":id/customer")
    public async updateCustomer(@Param("id") id: string): Promise<void> {
        const estimateService = await this.estimatesService.withDefaultCompany();
        const estimate = await estimateService.readById("213").toPromise();
        await estimateService.sparseUpdate(estimate.Estimate, {
            CustomerRef: {
                value: "70",
            }
        }).toPromise();

        const paymentService = await this.paymentsService.withDefaultCompany();
        const payment = await paymentService.readById("215").toPromise();
        const p = await paymentService.fullUpdate(payment.Payment, {
            ...payment.Payment,
            CustomerRef: {
                value: "70",
            },
            Line: []
        }).toPromise();

        const service = await this.invoicesService.withDefaultCompany();
        const invoice = await service.readById(id).toPromise();
        await service.sparseUpdate(invoice.Invoice, {
            CustomerRef: {
                value: "70"
            },
            LinkedTxn: [
                {
                    TxnType: "Payment",
                    TxnId: p.Payment.Id
                } as any
            ]
        }).toPromise();
    }
}
