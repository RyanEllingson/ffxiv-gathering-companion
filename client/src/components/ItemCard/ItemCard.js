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
                        <div className="col-3">
                            <p>Start time: {start}</p>
                        </div>
                        <div className="col-3">
                            <p>Duration: {duration} hours</p>
                        </div>
                        <div className="col-6">
                            <p>Discipline: {discipline}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <p>Region: {region}</p>
                        </div>
                        <div className="col-3">
                            <p>Coordinates: {coordinates}</p>
                        </div>
                        <div className="col-3">
                            <p>Nearest aetheryte: {aetheryte}</p>
                        </div>
                        <div className="col-3">
                            <p>Node type: {type}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ItemCard;