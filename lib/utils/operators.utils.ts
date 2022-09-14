import { Op } from "../modules/common/models";

export class OperatorsUtils {
    // tslint:disable-next-line:ban-types
    public static transform(attribute: string, op: Symbol, value: any): string {
        switch (op) {
            case Op.eq:
                return `${attribute} = ${this.transformValue(value)}`;
            case Op.ne:
                return `${attribute} != ${this.transformValue(value)}`;
            case Op.in:
                return `${attribute} in (${this.transformValue(value)})`;
            case Op.gt:
                return `${attribute} > ${this.transformValue(value)}`;
            case Op.gte:
                return `${attribute} >= ${this.transformValue(value)}`;
            case Op.lt:
                return `${attribute} < ${this.transformValue(value)}`;
            case Op.lte:
                return `${attribute} <= ${this.transformValue(value)}`;
            case Op.null:
                return `${attribute} is null`;
            case Op.notNull:
                return `${attribute} is not null`;
            case Op.like:
                return `${attribute} like ${this.transformValue(value)}`;
            case Op.notLike:
                return `${attribute} not like ${this.transformValue(value)}`;
            case Op.beginsWith:
                return `${attribute} like '${value}%'`;
            case Op.endsWith:
                return `${attribute} like '%${value}'`;
            case Op.contains:
                return `${attribute} like '%${value}%'`;
        }
    }

    public static transformValue(value: any): any {
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value === "string") {
            return `'${value}'`;
        }
        if (Array.isArray(value)) {
            return value.map(x => typeof x === "string" ? `'${x}'` : x).join(",");
        }

        return value;
    }
}
