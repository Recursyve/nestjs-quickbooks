import { Controller, Get, Post } from "@nestjs/common";
import { Op, QuickBooksCustomersService } from "../../../lib";

@Controller("customer")
export class CustomersController {
    constructor(private readonly customersService: QuickBooksCustomersService) {
    }

    @Get()
    public async getAll() {
        return (await this.customersService.withDefaultCompany()).query({
            MetaData: {
                LastUpdatedTime: {
                    [Op.gt]: "2015-03-01"
                }
            }
        }).toPromise().then(x => x.QueryResponse.Customer);
    }

    @Post()
    public async create() {
        return (await this.customersService.withDefaultCompany()).create({
            DisplayName: "My new customer",
            PrimaryEmailAddr: {
                Address: "julien@recursyve.io"
            }
        }).toPromise();
    }
}
