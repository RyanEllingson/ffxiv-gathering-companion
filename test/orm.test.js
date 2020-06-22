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

            res = {
                json: jest.fn()
            };

            await orm.findAndReturnItem(req, res);
            expect(res.json.mock.calls[0][0][0].item_name).toBe("Fire Cluster");
        });
        it("should not find 'ore' in the db", async () => {
            req = {
                params: {
                    item: "ore"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.findAndReturnItem(req, res);
            expect(res.json.mock.calls[0][0].length).toBe(0);
        });
    });
    describe("Get all items", () => {
        it("should find 3 items in the db", async () => {
            res = {
                json: jest.fn()
            };

            await orm.getAndReturnAllItems(req, res);
            expect(res.json.mock.calls[0][0].length).toBe(3);
        });
    });
    describe("Get all botany items", () => {
        it("should find 2 items in the db", async () => {
            res = {
                json: jest.fn()
            };

            await orm.getAndReturnBotanyItems(req, res);
            expect(res.json.mock.calls[0][0].length).toBe(2);
            expect(res.json.mock.calls[0][0][0].item_name).toBe("Fire Cluster");
            expect(res.json.mock.calls[0][0][1].item_name).toBe("Rosemary");
        });
    });
    describe("Get all mining items", () => {
        it("should find Raw Ruby in the db", async () => {
            res = {
                json: jest.fn()
            };

            await orm.getAndReturnMiningItems(req, res);
            expect(res.json.mock.calls[0][0].length).toBe(1);
            expect(res.json.mock.calls[0][0][0].item_name).toBe("Raw Ruby");
        });
    });
});


