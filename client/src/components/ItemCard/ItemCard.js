import React from "react";
import "./ItemCard.css";

const ItemCard = function({ aetheryte, coordinates, discipline, duration, id, image, name, type, region, start }) {
    return (
            <div className="media">
                <img src={image} className="mr-3" alt="item pic" />
                <div className="media-body">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="mt-0">{name}</h5>
                        </div>
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