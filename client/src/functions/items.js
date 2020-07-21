const axios = require("axios");

export const getAllItems = function(event, setItems) {
    event.preventDefault();
    axios.get("/api/items")
    .then((response) => {
        setItems(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};

export const getBotanyItems = function(event, setItems) {
    event.preventDefault();
    axios.get("/api/items/botany")
    .then((response) => {
        setItems(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};

export const getMiningItems = function(event, setItems) {
    event.preventDefault();
    axios.get("/api/items/mining")
    .then((response) => {
        setItems(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};

export const getEphemeralItems = function(event, setItems) {
    event.preventDefault();
    axios.get("/api/items/ephemeral")
    .then((response) => {
        setItems(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};

export const searchForItem = function(event, searchTerm, setItems) {
    event.preventDefault();
    axios.get(`/api/items/${searchTerm}`)
    .then((response) => {
        setItems(response.data);
    })
    .catch((err) => {
        console.error(err);
    });
};