const connection = require("./connection");

const orm = {
    findItem: function(req, res) {
        const searchString = req.params.item.split("+").join(" ");
        const queryString = `SELECT * FROM items WHERE item_name LIKE ?`;
        connection.query(queryString, [`%${searchString}%`], function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
}

module.exports = orm;