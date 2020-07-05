import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import "./ItemCard.css";

const ItemCard = function({ aetheryte, coordinates, discipline, duration, image, name, type, region, start, active, children }) {
    const { user } = useContext(AuthContext);

    return (
            <div className="media">
                <img src={image} className="mr-3" alt="item pic" />
                <div className="media-body">
                    <div className="row">
                        <div className="col-3">
                            <h5 className="mt-0">{name}{active ? " - active" : ""}</h5>
                        </div>
                        {user ? children : ""}
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="label">Region:</p>
                            <p>{region}</p>
                        </div>
                        <div className="col">
                            <p className="label">Coordinates:</p>
                            <p>{coordinates}</p>
                        </div>
                        <div className="col">
                            <p className="label">Nearest aetheryte:</p>
                            <p>{aetheryte}</p>
                        </div>
                        <div className="col">
                            <p className="label">Start time:</p>
                            <p>{start}</p>
                        </div>
                        <div className="col">
                            <p className="label">Duration:</p>
                            <p>{duration} hours</p>
                        </div>
                        <div className="col">
                            <p className="label">Discipline:</p>
                            <p>{discipline}</p>
                        </div>
                        <div className="col">
                            <p className="label">Node type:</p>
                            <p>{type}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ItemCard;