import { QuickBooksRefModel } from "./ref.model";
import { QuickBooksTaxTypeApplicableEnum } from "../enums/tax-type-applicable.enum";

export interface QuickBooksTaxRateDetailModel {
    TaxTypeApplicable: QuickBooksTaxTypeApplicableEnum;
    TaxRateRef: QuickBooksRefModel;
    TaxOrder: number;
}
