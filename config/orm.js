const connection = require("./connection");

const orm = {
    findItem: function(req) {
        const searchString = req.params.item.split("+").join(" ");
        const queryString = `SELECT * FROM items WHERE item_name LIKE ?`;
        const dbQuery = function(resolve, reject) {
            connection.query(queryString, [`%${searchString}%`], (err, result) => {
                if (err) {
                    return reject (err);
                }
                return resolve(result);
            });
        };
        return new Promise(dbQuery);
    },
    findAndReturnItem: async function(req, res) {
        const result = await orm.findItem(req);
        res.json(result);
    }
}

module.exports = {
    orm: orm,
    connection: connection
};