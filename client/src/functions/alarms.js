const axios = require("axios");
const moment = require("moment");

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

const isActive = function(start, duration, time) {
    const startTime = moment(start, "H:mm");
    const endTime = moment(start, "H:mm");
    endTime.add(duration, "hours");
    return startTime < time && time < endTime;
}

export const renderAlarms = function(alarmArray, setAlarms, setReadyAlarms, time) {
    const newAlarms = [];
    const activeAlarms = [];
        const checkTime = moment(time.format("HH"), "HH");
        for (let i=0; i<24; i++) {
        for (let j=0; j<alarmArray.length; j++) {
            if (checkTime.format("HH") === alarmArray[j].start_time.split(":")[0]) {
                if (isActive(alarmArray[j].start_time, alarmArray[j].duration, time)) {
                    activeAlarms.push(alarmArray[j]);
                } else {
                    newAlarms.push(alarmArray[j]);
                }
            }
        }
        checkTime.add(1, "hours");
    }
    setAlarms(newAlarms);
    setReadyAlarms(activeAlarms);
};

export const fetchAlarms = function(setAlarms, setReadyAlarms, time, user) {
    axios.get(`/api/alarms/${user}`)
    .then(function(response) {
        if (!response.data.error) {
            renderAlarms(response.data, setAlarms, setReadyAlarms, time);
        }
    })
    .catch(function(err) {
        console.error(err);
    });
};

export const deleteAlarm = function(event, id, setAlarms, setReadyAlarms) {
    event.preventDefault();
    axios.delete(`/api/alarms/${id}`)
    .then(function(response) {
        fetchAlarms(setAlarms, setReadyAlarms);
    })
    .catch(function(error) {
        console.error(error);
    });
};