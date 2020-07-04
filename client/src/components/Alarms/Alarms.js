import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import ItemCard from "../ItemCard";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const Alarms = function() {
    const { user } = useContext(AuthContext);
    const [alarms, setAlarms] = useState([]);
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    const renderAlarms = function() {
        axios.get(`/api/alarms/${user}`)
        .then(function(response) {
            if (!response.data.error) {
                setAlarms(response.data);
            }
        })
        .catch(function(err) {
            console.error(err);
        });
    };

    useEffect(() => {
        renderAlarms();
    }, []);

    const deleteAlarm = function(event, id) {
        event.preventDefault();
        axios.delete(`/api/alarms/${id}`)
        .then(function(response) {
            console.log(response.data);
            renderAlarms();
        })
        .catch(function(error) {
            console.error(error);
        });
    };

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