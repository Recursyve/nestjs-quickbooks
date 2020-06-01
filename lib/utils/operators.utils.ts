import { Op } from "../modules/common/models";

export class OperatorsUtils {
    // tslint:disable-next-line:ban-types
    public static transform(attribute: string, op: Symbol, value: any): string {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        if (typeof value === "string") {
            value = `'${value}'`;
        }

        switch (op) {
            case Op.eq:
                return `${attribute} = ${value}`;
            case Op.ne:
                return `${attribute} != ${value}`;
            case Op.gt:
                return `${attribute} > ${value}`;
            case Op.gte:
                return `${attribute} >= ${value}`;
            case Op.lt:
                return `${attribute} < ${value}`;
            case Op.lte:
                return `${attribute} <= ${value}`;
            case Op.null:
                return `${attribute} is null`;
            case Op.notNull:
                return `${attribute} is not null`;
            case Op.like:
                return `${attribute} like ${value}`;
            case Op.notLike:
                return `${attribute} not like ${value}`;
            case Op.beginsWith:
                return `${attribute} like ${value}%`;
            case Op.endsWith:
                return `${attribute} like %${value}`;
            case Op.contains:
                return `${attribute} like %${value}%`;
        }
    }
}
