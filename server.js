const express = require("express");
const cookieSession = require("cookie-session");
const { orm } = require("./config/orm");

const cookieKey = process.env.COOKIE_KEY || ";ljoisdufadnruoqerb";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({
    keys: [cookieKey]
}));

app.get("/api/items", orm.getAndReturnAllItems);
app.get("/api/items/botany", orm.getAndReturnBotanyItems);
app.get("/api/items/mining", orm.getAndReturnMiningItems);
app.get("/api/items/:item", orm.findAndReturnItem);
app.post("/api/register", orm.registerAndReturnUser);
app.post("/api/login", orm.loginAndReturnUser);
app.post("/api/alarms", orm.createAndReturnAlarm);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});