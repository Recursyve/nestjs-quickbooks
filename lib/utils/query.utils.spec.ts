import { QueryUtils } from "./query.utils";
import { Op } from "../modules/common/models/query.model";

describe("QueryUtils test", () => {
    it("generateQuery with no conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer");
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer");
    });

    it("[1] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Id: "150"
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Id = '150'");
    });

    it("[2] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Metadata: {
                LastUpdatedAt: "2015-01-01"
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Metadata.LastUpdatedAt = '2015-01-01'");
    });

    it("[3] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Metadata: {
                LastUpdatedAt: {
                    [Op.gte]: "2015-01-01"
                }
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Metadata.LastUpdatedAt >= '2015-01-01'");
    });

    it("[4] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Id: {
                [Op.in]: ["100", "101"]
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Id in ('100','101')");
    });

    it("[5] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            [Op.and]: [
                {
                    Id: "100"
                },
                {
                    Name: "100"
                }
            ]
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Id = '100' and Name = '100'");
    });

    it("[6] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Metadata: {
                LastUpdatedAt: "2015-01-01",
                CreateAt: "2015-01-01"
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Metadata.LastUpdatedAt = '2015-01-01' and Metadata.CreateAt = '2015-01-01'");
    });

    it("[7] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Id: {
                [Op.gte]: "0"
            },
            Metadata: {
                LastUpdatedAt: "2015-01-01"
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Id >= '0' and Metadata.LastUpdatedAt = '2015-01-01'");
    });

    it("[8] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Metadata: {
                LastUpdatedAt: "2015-01-01"
            },
            CustomerRef: {
                value: "5"
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Metadata.LastUpdatedAt = '2015-01-01' and CustomerRef.value = '5'");
    });

    it("[9] generateQuery with conditions should return a valid query", () => {
        const query = QueryUtils.generateQuery("customer", {
            Name: {
                [Op.contains]: "My Name"
            }
        });
        const params = new URLSearchParams(query);
        expect(params.has("query")).toBeTruthy();
        expect(params.get("query")).toBe("select * from customer where Name like '%My Name%'");
    });
});
