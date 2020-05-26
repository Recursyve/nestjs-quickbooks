import { Controller, Get, Header, Param, Res } from "@nestjs/common";
import { Op } from "../../../lib/modules/common/models/query.model";
import { InvoicesService } from "../../../lib/modules/invoices/services/invoices.service";

@Controller("invoice")
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {
    }

    @Get()
    public async getAll() {
        return this.invoicesService.withDefaultCompany().query({
            MetaData: {
                LastUpdatedTime: {
                    [Op.gt]: "2015-03-01"
                }
            }
        }).toPromise().then(x => x.QueryResponse.Invoice);
    }

    @Get("pdf/:id")
    @Header("Content-Type", "application/pdf")
    public async getPdf(@Param("id") id: string, @Res() res): Promise<Buffer> {
        return this.invoicesService.withDefaultCompany().getPdf(id).toPromise();
    }
}
