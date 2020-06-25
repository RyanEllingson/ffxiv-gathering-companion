const connection = require("./connection");
const Validator = require("validator");
const crypto = require("crypto");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");



const orm = {
    findItem: function(req) {
        const searchString = req.params.item.split("+").join(" ");
        const queryString = "SELECT * FROM items WHERE item_name LIKE ?";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, [`%${searchString}%`], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    findAndReturnItem: async function(req, res) {
        try {
            const result = await orm.findItem(req);
            res.json(result);
        } catch (err) {
            res.json({...err, error: true});
        }
        
    },
    getAllItems: function() {
        const queryString = "SELECT * FROM items";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    getAndReturnAllItems: async function(req, res) {
        try {
            const result = await orm.getAllItems();
            res.json(result);
        } catch (err) {
            res.json({...err, error: true});
        }
        
    },
    getBotanyItems: function() {
        const queryString = "SELECT * FROM items WHERE discipline = 'botany'";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    getAndReturnBotanyItems: async function(req, res) {
        try {
            const result = await orm.getBotanyItems();
            res.json(result);
        } catch (err) {
            res.json({...err, error: true});
        }
        
    },
    getMiningItems: function() {
        const queryString = "SELECT * FROM items WHERE discipline = 'mining'";
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    getAndReturnMiningItems: async function(req, res) {
        try {
            const result = await orm.getMiningItems();
            res.json(result);
        } catch(err) {
            res.json({...err, error: true});
        }
        
    },
    registerUser: function(userInfo) {
        const queryString = "INSERT INTO users SET ?";
        const dbQuery = async function(resolve, reject) {
            const {errors, isValid} = await validateRegisterInput(userInfo, connection);
            if (!isValid) {
                return reject(errors);
            }
            const normalizedEmail = Validator.normalizeEmail(userInfo.email);
            const salt = crypto.randomBytes(8).toString("hex");
            const hashedPass = crypto.scryptSync(userInfo.password, salt, 64).toString("hex");
            connection.query(queryString, { email: normalizedEmail, password: `${hashedPass}.${salt}` }, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    registerAndReturnUser: async function(req, res) {
        try {
            const result = await orm.registerUser(req.body);
            const hash = crypto.createHash("sha256");
            hash.update(result.insertId.toString());
            const hashedId = hash.digest("hex");
            req.session.userId = hashedId;
            res.json(result);
        } catch (err) {
            res.json({...err, error: true});
        }
    },
    login: function(loginInfo) {
        const queryString = "SELECT * FROM users WHERE email = ?";
        const dbQuery = async function(resolve, reject) {
            const {errors, isValid} = await validateLoginInput(loginInfo);
            if (!isValid) {
                return reject(errors);
            }
            const normalizedEmail = Validator.normalizeEmail(loginInfo.email);
            connection.query(queryString, [normalizedEmail], function(err, result) {
                if (err) {
                    console.log("here!");
                    return reject(err);
                }
                if (result.length < 1) {
                    return reject({email: "Email not found"});
                }
                const [hash, salt] = result[0].password.split(".");
                const hashedPass = crypto.scryptSync(loginInfo.password, salt, 64).toString("hex");
                if (!Validator.equals(hash, hashedPass)) {
                    return reject({password: "Incorrect password"});
                }
                return resolve(result[0]);
            });
        };
        return new Promise(dbQuery);
    },
    loginAndReturnUser: async function(req, res) {
        try {
            const result = await orm.login(req.body);
            const hash = crypto.createHash("sha256");
            hash.update(result.id.toString());
            const hashedId = hash.digest("hex");
            req.session.userId = hashedId;
            res.json(result);
        } catch (err) {
            res.json({...err, error: true});
        }
    },
    logout: function(req, res) {
        req.session = null;
        res.json({loggedOut: true});
    }
};

module.exports = {
    orm: orm,
    connection: connection
};