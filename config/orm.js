const connection = require("./connection");

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
        const result = await orm.findItem(req);
        res.json(result);
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
        const result = await orm.getAllItems();
        res.json(result);
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
        const result = await orm.getBotanyItems();
        res.json(result);
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
        const result = await orm.getMiningItems();
        res.json(result);
    }
};

module.exports = {
    orm: orm,
    connection: connection
};