import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import { TimeContext } from "../../time/time";
import ItemCard from "../ItemCard";
import { useHistory } from "react-router-dom";
const axios = require("axios");
const moment = require("moment");

const Alarms = function() {
    const { user } = useContext(AuthContext);
    const { time } = useContext(TimeContext);
    const [alarms, setAlarms] = useState([]);
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    const sortedAlarms = function(alarmArray) {
        const newAlarms = [];
        const activeAlarms = [];
        const checkTime = moment(time.format("HH"), "HH");
        for (let i=0; i<24; i++) {
            console.log(checkTime.format("HH"));
            for (let j=0; j<alarmArray.length; j++) {
                if (checkTime.format("HH") === alarmArray[j].start_time.split(":")[0]) {
                    if (isActive(alarmArray[j].start_time, alarmArray[j].duration)) {
                        activeAlarms.push(alarmArray[j]);
                    } else {
                        newAlarms.push(alarmArray[j]);
                    }
                }
            }
            checkTime.add(1, "hours");
        }
        return activeAlarms.concat(newAlarms);
    }

    const renderAlarms = function() {
        axios.get(`/api/alarms/${user}`)
        .then(function(response) {
            if (!response.data.error) {
                setAlarms(sortedAlarms(response.data));
            }
        })
        .catch(function(err) {
            console.error(err);
        });
    };

    let delay = false;

    if (time.get("minutes") === 0 && !delay) {
        delay = true;
        setTimeout(() => {
            delay = false;
            setAlarms(sortedAlarms(alarms));
        }, 3500);
    }

    useEffect(() => {
        renderAlarms();
    }, []);


    const deleteAlarm = function(event, id) {
        event.preventDefault();
        axios.delete(`/api/alarms/${id}`)
        .then(function(response) {
            renderAlarms();
        })
        .catch(function(error) {
            console.error(error);
        });
    };

    const isActive = function(start, duration) {
        const startTime = moment(start, "H:mm");
        const endTime = moment(start, "H:mm");
        endTime.add(duration, "hours");
        return startTime < time && time < endTime;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div class="card mb-5">
                        <ul class="list-group">
                            {alarms.map((alarm) => {
                                return <li className="list-group-item">
                                    <ItemCard
                                        key={alarm.id}
                                        aetheryte={alarm.aetheryte}
                                        coordinates={alarm.coordinates}
                                        discipline={alarm.discipline}
                                        duration={alarm.duration}
                                        image={alarm.image_url}
                                        name={alarm.item_name}
                                        type={alarm.node_type}
                                        region={alarm.region}
                                        start={alarm.start_time}
                                        active={isActive(alarm.start_time, alarm.duration)}
                                    >
                                        <div className="col-7">
                                            <p>{alarm.notes}</p>
                                        </div>
                                        <div className="col-2 text-right">
                                            <button className="btn btn-danger" onClick={(e)=>{deleteAlarm(e, alarm.id)}}>Delete alarm</button>
                                        </div>
                                    </ItemCard>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alarms;