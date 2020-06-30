import React, { useState, useEffect } from "react";
const moment = require("moment");

const Clock = function() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const myInterval = setInterval(function() {
            const epochTime = moment().valueOf();
            const eorzeaMultiplier = 3600/175;
            const eorzeaTime = moment(epochTime * eorzeaMultiplier).add(5, "h");
            const timeString = eorzeaTime.format("h:mm a");
            setTime(timeString);
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