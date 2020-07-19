import React, { useContext } from "react";
import { AuthContext } from "../../auth/auth";
import "./ItemCard.css";
const moment = require("moment");

const ItemCard = function({ aetheryte, coordinates, discipline, duration, image, name, type, region, start, notes, children }) {
    const { user } = useContext(AuthContext);

    const startTime = moment(start, "H:mm");
    const endTime = moment(start, "H:mm");
    endTime.add(duration, "hours");

    return (
            <div className="media">
                <img src={image} className="mr-3" alt="item pic" />
                <div className="media-body">
                    <div className="row">
                        <div className="col-7 col-sm-8 col-md-9">
                            <h5 className="mt-0">{name}</h5>
                        </div>
                        {user ? children : ""}
                    </div>
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Region:</p>
                            <p>{region}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Coordinates:</p>
                            <p>{coordinates}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Nearest aetheryte:</p>
                            <p>{aetheryte}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Start time:</p>
                            <p>{startTime.format("h:mm a")}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">End time:</p>
                            <p>{endTime.format("h:mm a")}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Discipline:</p>
                            <p>{discipline}</p>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3 col-xl">
                            <p className="label">Node type:</p>
                            <p>{type}</p>
                        </div>
                    </div>
                    {notes ? <div className="row">
                        <div className="col-12 d-flex">
                            <p className="label mr-1">Notes:</p>
                            <p>{notes}</p>
                        </div>
                    </div> : ""}
                </div>
            </div>
    );
};

export default ItemCard;