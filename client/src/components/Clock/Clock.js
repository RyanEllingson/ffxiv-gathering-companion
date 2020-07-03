import React, { useContext } from "react";
import { TimeContext } from "../../time/time";

const Clock = function() {
    const { time } = useContext(TimeContext);
    
    return (
        <span>{time.format("h:mm a")}</span>
    );
};

export default Clock;