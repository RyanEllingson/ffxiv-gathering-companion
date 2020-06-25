process.env.NODE_ENV = "test";
const { orm, connection } = require("../config/orm");
const crypto = require("crypto");

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
    const clearUsers = function() {
        const queryString = "DELETE FROM users";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise (dbQuery);
    }
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
    describe("Register new user", () => {
        it("should add a new user to the db and attach cookie session to request", async () => {
            await clearUsers();
            req = {
                body: {
                    email: "test@test.com",
                    password: "password",
                    password2: "password"
                },
                session: {}
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            const hash = crypto.createHash("sha256");
            hash.update(res.json.mock.calls[0][0].insertId.toString());
            const hashedId = hash.digest("hex");
            expect(req.session.userId).toBe(hashedId);
            expect(res.json.mock.calls[0][0].affectedRows).toBe(1);
        });
        it("should return an 'email is required' error", async () => {
            req = {
                body: {
                    password: "password",
                    password2: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email field is required");
        });
        it("should return an 'email is invalid' error", async () => {
            req = {
                body: {
                    email: "adklfjas;dfj",
                    password: "password",
                    password2: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email is invalid");
        });
        it("should return an 'email already is use' error", async () => {
            req = {
                body: {
                    email: "test@test.com",
                    password: "password",
                    password2: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email already in use");
        });
        it("should return a 'password field required' error", async () => {
            req = {
                body: {
                    email: "test2@test.com",
                    password2: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].password).toBe("Password field is required");
        });
        it("should return a 'confirm password field required' error", async () => {
            req = {
                body: {
                    email: "test2@test.com",
                    password: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].password2).toBe("Confirm password field is required");
        });
        it("should return a 'passwords must match' error", async () => {
            req = {
                body: {
                    email: "test2@test.com",
                    password: "password",
                    password2: ";aslkdjf"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.registerAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].password2).toBe("Passwords must match");
        })
    });
    describe("Logout", () => {
        it("should remove cookie session from request", () => {
            req = {
                session: {id: "whatever"}
            };

            res = {
                json: jest.fn()
            };

            orm.logout(req, res);
            expect(req.session).toBeNull();
            expect(res.json.mock.calls[0][0].loggedOut).toBe(true);
        });
    });
    describe("Login as existing user", () => {
        it("should successfully log in and attach cookie session to request", async () => {
            req = {
                body: {
                    email: "test@test.com",
                    password: "password"
                },
                session: {}
            };
    
            res = {
                json: jest.fn()
            };
    
            await orm.loginAndReturnUser(req, res);
            const hash = crypto.createHash("sha256");
            hash.update(res.json.mock.calls[0][0].id.toString());
            const hashedId = hash.digest("hex");
            expect(req.session.userId).toBe(hashedId);
            expect(res.json.mock.calls[0][0].email).toBe("test@test.com");
        });
        it("should return an 'email is required' error", async () => {
            req = {
                body: {
                    password: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.loginAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email field is required");
        });
        it("should return an 'email is invalid' error", async () => {
            req = {
                body: {
                    email: "df;asldjfa;ldj",
                    password: "password"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.loginAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email is invalid");
        });
        it("should return an 'email not found' error", async() => {
            req = {
                body: {
                    email: "blah@blah.com",
                    password: "whatever"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.loginAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email not found");
        })
        it("should return a 'password is required' error", async () => {
            req = {
                body: {
                    email: "test@test.com"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.loginAndReturnUser(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].password).toBe("Password field is required");
        });
    });
});


