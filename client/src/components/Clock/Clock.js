import React, { useState, useEffect } from "react";
const moment = require("moment");

const Clock = function() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const myInterval = setInterval(function() {
            const epochTime = moment().valueOf();
            const eorzeaMultiplier = 3600/175;
            // const eorzeaTime = moment(epochTime * eorzeaMultiplier).add(5, "h");
            // const timeString = eorzeaTime.format("h:mm a");
            // setTime(timeString);
            const eorzeaMS = epochTime*eorzeaMultiplier;
            const totalSeconds = eorzeaMS / 1000;
            const totalMinutes = totalSeconds /60;
            const totalHours = totalMinutes / 60;
            const hours = Math.floor(totalHours % 24);
            const minutes = Math.floor(totalMinutes % 60);
            const eorzeaTime = moment(`${hours}:${minutes}`, "H:mm");
            const timeString = eorzeaTime.format("h:mm a");
            setTime(timeString);
            // const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            // let amOrPm;
            // let formattedHours;
            // if (hours < 1) {
            //     amOrPm = "am";
            // } else if (hours > 12) {

            // }
        }, 2916);

        return function cleanup() {
            clearInterval(myInterval);
        };
    }, [])
    
    return (
        <span>{time}</span>
    );
};

export default Clock;