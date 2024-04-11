export interface Op {
    readonly eq: unique symbol;
    readonly ne: unique symbol;
    readonly in: unique symbol;

    readonly gt: unique symbol;
    readonly lt: unique symbol;
    readonly gte: unique symbol;
    readonly lte: unique symbol;

    readonly beginsWith: unique symbol;
    readonly endsWith: unique symbol;
    readonly contains: unique symbol;

    readonly notNull: unique symbol;
    readonly null: unique symbol;

    readonly like: unique symbol;
    readonly notLike: unique symbol;

    readonly and: unique symbol;
}

export const Op: Op = {
    eq: Symbol.for("Equals") as any,
    ne: Symbol.for("NotEqual") as any,
    in: Symbol.for("In") as any,

    gt: Symbol.for("GreaterThan") as any,
    lt: Symbol.for("LessThan") as any,
    gte: Symbol.for("GreaterThanOrEquals") as any,
    lte: Symbol.for("LessThanOrEquals") as any,

    beginsWith: Symbol.for("BeginsWith") as any,
    endsWith: Symbol.for("EndsWith") as any,
    contains: Symbol.for("Contains") as any,

    notNull: Symbol.for("IsNotNull") as any,
    null: Symbol.for("IsNull") as any,

    like: Symbol.for("Like") as any,
    notLike: Symbol.for("NotLike") as any,

    and: Symbol.for("And") as any
};

export interface WhereOperators {
    [Op.eq]?: number | string | Date;
    [Op.ne]?: number | string | Date;
    [Op.in]?: (number | string)[];

    [Op.gt]?: number | string | Date;
    [Op.gte]?: number | string | Date;
    [Op.lt]?: number | string | Date;
    [Op.lte]?: number | string | Date;

    [Op.beginsWith]?: string;
    [Op.endsWith]?: string;
    [Op.contains]?: string;

    [Op.like]?: string;
    [Op.notLike]?: string;
}

export interface AndOperator<T> {
    [Op.and]: WhereOptions<T>[];
}

export type WhereValue =
    | string
    | number
    | boolean
    | symbol
    | Date
    | WhereOperators;

export type WhereAttributeHash<T> = {
    [P in keyof T]?: T[P] extends object ? WhereAttributeHash<Partial<T[P]>> : WhereValue;
};

export type WhereOptions<T> = WhereAttributeHash<T> | AndOperator<T>;

export interface QueryOptions {
    startPosition?: number;
    maxResult?: number;
    orderBy?: {
        column: string;
        direction: "ASC" | "DESC";
    };
}

export enum QueryStatementType {
    Select,
    Count
}
