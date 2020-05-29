import {
    QuickBooksDateTimeModel,
    QuickBooksEmailModel,
    QuickBooksModel,
    QuickBooksPhoneNumberModel,
    QuickBooksPhysicalAddressModel,
    QuickBooksWebsiteModel
} from "../../common/models";
import { MonthsEnum } from "../../common/enums";

export interface QuickBooksCompanyInfo extends QuickBooksModel {
    CompanyName: string;
    PhysicalAddress: QuickBooksPhysicalAddressModel;
    LegalAddr: QuickBooksPhysicalAddressModel;
    SupportedLanguages: string;
    Country: string;
    Email: QuickBooksEmailModel;
    WebAddr: QuickBooksWebsiteModel;
    NameValue: { name: string, value: string }[];
    FiscalYearStartMonth: MonthsEnum;
    CustomerCommunicationAddr: QuickBooksPhysicalAddressModel;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    LegalName: string;
    CompanyStartDate: QuickBooksDateTimeModel;
}
