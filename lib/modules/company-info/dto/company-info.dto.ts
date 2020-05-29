import { MonthsEnum } from "../../common/enums";
import {
    QuickBooksEmailDto,
    QuickBooksPhoneNumberDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksWebsiteDto
} from "../../common/dto";

export interface QuickBooksCompanyInfoDto {
    CompanyName: string;
    CompanyAddr: QuickBooksPhysicalAddressDto;
    LegalAddr?: QuickBooksPhysicalAddressDto;
    SupportedLanguages?: string;
    Country?: string;
    Email?: QuickBooksEmailDto;
    WebAddr?: QuickBooksWebsiteDto;
    NameValue?: { name: string, value: string }[];
    FiscalYearStartMonth?: MonthsEnum;
    CustomerCommunicationAddr?: QuickBooksPhysicalAddressDto;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    LegalName?: string;
}

export type FullUpdateQuickBooksCompanyInfoDto = QuickBooksCompanyInfoDto;

export type SparseUpdateQuickBooksCompanyInfoDto = QuickBooksCompanyInfoDto;
