import { Op, WhereOptions } from "../modules/common/models/query.model";
import { OperatorsUtils } from "./operators.utils";

export class QueryUtils {
    public static generateQuery(resource: string, condition?: WhereOptions<any>): string {
        const where = this.generateWhereCondition(condition);
        let query = `select * from ${resource}`;
        if (where) {
            query += ` where ${where}`;
        }

        const params = new URLSearchParams({ query });
        return params.toString();
    }

    private static generateWhereCondition(condition: WhereOptions<any>, parent?: string): string {
        if (!condition) {
            return null;
        }

        const rules: string[] = [];
        const keys = Object.getOwnPropertySymbols(condition);
        if (keys.length) {
            for (const key of keys) {
                if (condition[key] instanceof Array) {
                    if (key === Op.and) {
                        rules.push(this.generateGroupCondition(condition[key]));
                    } else if (key === Op.in) {
                        rules.push(OperatorsUtils.transform(parent, key, condition[key]));
                    }
                } else {
                    rules.push(OperatorsUtils.transform(parent, key, condition[key]));
                }
            }
        }

        for (const key in condition) {
            if (!condition.hasOwnProperty(key)) {
                continue;
            }

            if (condition[key] instanceof Array) {
                if (key as any === Op.and) {
                    rules.push(this.generateGroupCondition(condition[key]));
                } else if (key as any === Op.in) {
                    rules.push(OperatorsUtils.transform(this.joinName(key, parent), Op.in, condition[key]));
                }
                continue;
            }

            if (typeof condition[key] === "object") {
                rules.push(this.generateWhereCondition(condition[key], this.joinName(key, parent)));
                continue;
            }

            rules.push(OperatorsUtils.transform(this.joinName(key, parent), Op.eq, condition[key]));
        }
        return rules.join(" and ");
    }

    private static generateGroupCondition(conditions: WhereOptions<any>[]): string {
        if (!conditions.length) {
            return null;
        }

        const rules: string[] = [];
        for (const condition of conditions) {
            rules.push(this.generateWhereCondition(condition));
        }

        return rules.join(" and ");
    }

    private static joinName(key: string, parent?: string): string {
        if (!parent) {
            return key;
        }
        return [parent, key].join(".");
    }
}
