const mysql = require("mysql");
const JAWSDB_URL = process.env.JAWSDB_URL;

const connection = JAWSDB_URL ? mysql.createConnection(JAWSDB_URL) : mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "gathering_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err)
    } else {
        console.log("connected as id " + connection.threadId);
    }
});

module.exports = connection;