const axios = require("axios");

export const createAlarm = function(event, id, email, note) {
    event.preventDefault();
    axios.post("/api/alarms", {
        email: email,
        itemId: id,
        notes: note
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};