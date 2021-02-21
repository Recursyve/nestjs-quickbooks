import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksEmployees } from "./employees.model";

export interface QuickBooksEmployeesResponseModel extends QuickBooksResponseModel {
    Employee: QuickBooksEmployees;
}

export interface QuickBooksEmployeesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Employee: QuickBooksEmployees[]; };
}
