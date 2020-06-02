import { QuickBooksRefModel } from "./ref.model";

export interface QuickBooksTxnTaxDetailModel {
    TxnTaxCodeRef?: QuickBooksRefModel;
    TotalTax?: number;
    TaxLine?: {
        DetailType: string;
        TaxLineDetail: {
            TaxRateRef: QuickBooksRefModel;
            NetAmountTaxable?: number;
            PercentBased?: boolean;
            TaxInclusiveAmount?: number;
            OverrideDeltaAmount?: number;
            TaxPercent?: number;
        };
        Amount?: number;
    }[];
}
