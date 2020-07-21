import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import { TimeContext } from "../../time/time";
import ItemCard from "../ItemCard";
import { useHistory } from "react-router-dom";
import { renderAlarms, fetchAlarms, deleteAlarm } from "../../functions/alarms";

const Alarms = function() {
    const { user } = useContext(AuthContext);
    const { time } = useContext(TimeContext);
    const [alarms, setAlarms] = useState([]);
    const [readyAlarms, setReadyAlarms] = useState([]);
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    let delay = false;

    if (time.get("minutes") === 1 && !delay) {
        delay = true;
        setTimeout(() => {
            delay = false;
            const alarmSet = readyAlarms.concat(alarms);
            renderAlarms(alarmSet, setAlarms, setReadyAlarms, time);
        }, 3500);
    }

    useEffect(() => {
        fetchAlarms(setAlarms, setReadyAlarms, time, user);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div class="card mb-5">
                        <h5 className="card-header bg-dark text-light text-center">Ready to Gather!</h5>
                        <ul class="list-group">
                            {readyAlarms.map((alarm) => {
                                return <li className="list-group-item bg-light">
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
                                        notes={alarm.notes}
                                    >
                                        <div className="col-5 col-sm-4 col-md-3 text-right">
                                            <button className="btn btn-danger" onClick={(e)=>{deleteAlarm(e, alarm.id, setAlarms, setReadyAlarms)}}>Delete alarm</button>
                                        </div>
                                    </ItemCard>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div class="card mb-5">
                        <ul class="list-group">
                            {alarms.map((alarm) => {
                                return <li className="list-group-item bg-light">
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
                                        notes={alarm.notes}
                                    >
                                        <div className="col-5 col-sm-4 col-md-3 text-right">
                                            <button className="btn btn-danger" onClick={(e)=>{deleteAlarm(e, alarm.id, setAlarms, setReadyAlarms)}}>Delete alarm</button>
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