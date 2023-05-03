import { Body, Controller, Get, Post } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { Op, QuickBooksCustomersService } from "../../../lib";

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

    @Get("name")
    public async GetByName() {
        const service = await this.customersService.withDefaultCompany();
        const response = await lastValueFrom(service.query({
            DisplayName: {
                [Op.contains]: "'"
            }
        }));
        return response.QueryResponse;
    }

    @Post()
    public async create(@Body() dto: any) {
        return lastValueFrom((await this.customersService.withDefaultCompany()).create({
            DisplayName: dto.name,
            PrimaryEmailAddr: {
                Address: "julien@recursyve.io"
            }
        }));
    }
}
