const express = require("express");
const { orm } = require("./config/orm");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/items/:item", orm.findAndReturnItem);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});