import { Controller, Get } from "@nestjs/common";
import { CustomersService } from "../../../lib/modules/customers/services/customers.service";

@Controller("customer")
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {
    }

    @Get()
    public async getAll() {
        return this.customersService.withDefaultCompany().getAll().toPromise();
    }
}
