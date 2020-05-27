import { Controller, Get, Header, Param, Res } from "@nestjs/common";
import { Op, QuickBooksInvoicesService } from "../../../lib";

@Controller("invoice")
export class InvoicesController {
    constructor(private readonly invoicesService: QuickBooksInvoicesService) {
    }

    @Get()
    public async getAll() {
        return (await this.invoicesService.withDefaultCompany()).query({
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
        return (await this.invoicesService.withDefaultCompany()).getPdf(id).toPromise();
    }
}
