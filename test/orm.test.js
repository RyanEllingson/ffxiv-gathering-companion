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
    let sessionId;
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
        return new Promise(dbQuery);
    };
    const clearAlarms = function() {
        const queryString = "DELETE FROM alarms";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    };
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
            await clearAlarms();
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
            expect(req.session.email).toBe("test@test.com");
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
        });
    });
    describe("Logout", () => {
        it("should remove cookie session from request", () => {
            req = {
                session: {
                    id: "whatever",
                    email: "blah@blah.com"
                }
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
            sessionId = hashedId;
            expect(req.session.userId).toBe(hashedId);
            expect(req.session.email).toBe("test@test.com");
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
        });
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
    describe("Add a new alarm", () => {
        it("should successfully add an alarm for a logged-in user", async () => {
            req = {
                body: {
                    email: "test@test.com",
                    itemId: 1,
                    notes: "this is a note"
                },
                session: {
                    userId: sessionId
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.createAndReturnAlarm(req, res);
            expect(res.json.mock.calls[0][0].affectedRows).toBe(1);
        });
        it("should return an 'email not found' error", async () => {
            req = {
                body: {
                    email: "blahblah@something.com",
                    itemId: 1,
                    notes: "whatever"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.createAndReturnAlarm(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email not found");
        });
        it("should return an 'invalid credentials' error", async () => {
            req = {
                body: {
                    email: "test@test.com",
                    itemId: 1,
                    notes: "note"
                },
                session: {
                    userId: "somerandomcharacters"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.createAndReturnAlarm(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Invalid credentials");
        });
    });
    describe("Get all alarms", () => {
        it("should find all alarms for currently logged-in user", async () => {
            req = {
                session: {
                    userId: sessionId,
                    email: "test@test.com"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.getAndReturnAlarms(req, res);
            expect(res.json.mock.calls[0][0].length).toBe(1);
            expect(res.json.mock.calls[0][0][0].item_name).toBe("Fire Cluster");
        });
        it("should return an 'email not found' error", async () => {
            req = {
                session: {
                    email: "ds;lfjad;lkfj"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.getAndReturnAlarms(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Email not found");
        });
        it("should return an 'invalid credentials' error", async () => {
            req = {
                session: {
                    userId: "ds;lfjas;dlfjsd;",
                    email: "test@test.com"
                }
            };

            res = {
                json: jest.fn()
            };

            await orm.getAndReturnAlarms(req, res);
            expect(res.json.mock.calls[0][0].error).toBe(true);
            expect(res.json.mock.calls[0][0].email).toBe("Invalid credentials");
        });
    });
});


