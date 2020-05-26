import { Controller, Get, Post } from "@nestjs/common";
import { CustomersService } from "../../../lib/modules/customers/services/customers.service";
import { Op } from "../../../lib/modules/common/models/query.model";

@Controller("customer")
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {
    }

    @Get()
    public async getAll() {
        return this.customersService.withDefaultCompany().query({
            MetaData: {
                LastUpdatedTime: {
                    [Op.gt]: "2015-03-01"
                }
            }
        }).toPromise().then(x => x.QueryResponse.Customer);
    }

    @Post()
    public async create() {
        return this.customersService.withDefaultCompany().create({
            DisplayName: "My new customer",
            PrimaryEmailAddr: {
                Address: "julien@recursyve.io"
            }
        }).toPromise();
    }
}
