import React, { useState, useEffect } from "react";
const moment = require("moment");

export const TimeContext = React.createContext("time");

export function Time({ children }) {
    const [time, setTime] = useState(moment());

    useEffect(() => {
        const myInterval = setInterval(function() {
            const epochTime = moment().valueOf();
            const eorzeaMultiplier = 3600/175;
            const eorzeaMS = epochTime*eorzeaMultiplier;
            const totalSeconds = eorzeaMS / 1000;
            const totalMinutes = totalSeconds /60;
            const totalHours = totalMinutes / 60;
            const hours = Math.floor(totalHours % 24);
            const minutes = Math.floor(totalMinutes % 60);
            const eorzeaTime = moment(`${hours}:${minutes}`, "H:mm");
            setTime(eorzeaTime);
        }, 2916);

        return function cleanup() {
            clearInterval(myInterval);
        };
    }, []);

    return (
        <TimeContext.Provider
            value={{ time }}>
            {children}
        </TimeContext.Provider>
    );
};