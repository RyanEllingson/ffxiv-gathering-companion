const express = require("express");
const cookieSession = require("cookie-session");
const path = require("path");
const { orm } = require("./config/orm");

const cookieKey = process.env.COOKIE_KEY || ";ljoisdufadnruoqerb";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({
    keys: [cookieKey]
}));
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/api/items", orm.getAndReturnAllItems);
app.get("/api/items/botany", orm.getAndReturnBotanyItems);
app.get("/api/items/mining", orm.getAndReturnMiningItems);
app.get("/api/items/:item", orm.findAndReturnItem);
app.post("/api/register", orm.registerAndReturnUser);
app.post("/api/login", orm.loginAndReturnUser);
app.get("/api/logout", orm.logout);
app.post("/api/alarms", orm.createAndReturnAlarm);
app.get("/api/alarms", orm.getAndReturnAlarms);
app.delete("/api/alarms", orm.deleteAlarmAndReturn);

app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});