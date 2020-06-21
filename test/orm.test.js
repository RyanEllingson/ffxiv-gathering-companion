process.env.NODE_ENV = "test";
const { orm, connection } = require("../config/orm");

describe("API routes", () => {
    let req = {};
    let res = {};
    beforeEach(() => {
        req = {};
        res = {};
    });
    afterAll(() => {
        connection.end(function(err) {
            // Connection terminated
        });
    });
    describe("Search for item", () => {
        it("should find Fire Cluster in the db", async () => {
            req = {
                params: {
                    item: "ire c"
                }
            };

            const result = await orm.findItem(req);
            expect(result[0].item_name).toBe("Fire Cluster");
        });
        it("should not find 'ore' in the db", async () => {
            req = {
                params: {
                    item: "ore"
                }
            };

            const result = await orm.findItem(req);
            expect(result.length).toBe(0);
        });
    })
});


