const mysql = require("mysql");
const JAWSDB_URL = process.env.JAWSDB_URL;

const env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/config.json")[env];
if (process.env.CI) {
    config = require(__dirname + "/config.json").ci;
}

let connection;
if (config.use_env_variable) {
    connection = mysql.createConnection(JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
    });
}

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err)
    } else {
        console.log("connected as id " + connection.threadId);
    }
});

module.exports = connection;