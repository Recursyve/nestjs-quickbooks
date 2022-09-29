import { Controller, Get, Header, Param, Put, Res } from "@nestjs/common";
import * as fs from "fs/promises";
import * as path from "path";
import { lastValueFrom } from "rxjs";
import {
    Op,
    QuickBooksAttachablesService,
    QuickBooksAttachablesUploadResponseModel,
    QuickBooksInvoicesService
} from "../../../lib";

@Controller("invoice")
export class InvoicesController {
    constructor(
        private readonly attachablesService: QuickBooksAttachablesService,
        private readonly invoicesService: QuickBooksInvoicesService,
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
}
