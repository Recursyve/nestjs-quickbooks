import { Controller, Get, Post } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { QuickBooksCustomersService } from "../../../lib";

@Controller("customer")
export class CustomersController {
    constructor(private readonly customersService: QuickBooksCustomersService) {
    }

    @Get()
    public async getAll() {
        const service = await this.customersService.withDefaultCompany();
        const count = await lastValueFrom(service.count({}));
        return lastValueFrom(service.query({
            /* MetaData: {
                 LastUpdatedTime: {
                     [Op.gt]: "2015-03-01"
                 }
             }*/
        }, { maxResult: count?.QueryResponse?.totalCount })).then(x => x.QueryResponse.Customer);
    }

    @Post()
    public async create() {
        return lastValueFrom((await this.customersService.withDefaultCompany()).create({
            DisplayName: "My new customer",
            PrimaryEmailAddr: {
                Address: "julien@recursyve.io"
            }
        }));
    }
}
