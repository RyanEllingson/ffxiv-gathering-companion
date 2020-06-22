const express = require("express");
const { orm } = require("./config/orm");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/items", orm.getAndReturnAllItems);
app.get("/api/items/botany", orm.getAndReturnBotanyItems);
app.get("/api/items/mining", orm.getAndReturnMiningItems);
app.get("/api/items/:item", orm.findAndReturnItem);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});