import { QuickBooksRefDto } from "./ref.dto";


export interface QuickBooksTxnTaxDetailDto {
    TxnTaxCodeRef?: QuickBooksRefDto;
    TotalTax?: number;
    TaxLine?: {
        DetailType: "TxnTaxCodeRef";
        TaxLineDetail: {
            TaxRateRef?: QuickBooksRefDto;
            NetAmountTaxable?: number;
            PercentBased?: boolean;
            TaxInclusiveAmount?: number;
            OverrideDeltaAmount?: number;
            TaxPercent?: number;
        };
        Amount?: number;
    }[];
}
