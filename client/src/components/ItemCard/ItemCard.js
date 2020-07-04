import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import "./ItemCard.css";

const ItemCard = function({ aetheryte, coordinates, discipline, duration, id, image, name, type, region, start, handleClick}) {
    const { user } = useContext(AuthContext);
    const [note, setNote] = useState("");

    return (
            <div className="media">
                <img src={image} className="mr-3" alt="item pic" />
                <div className="media-body">
                    <div className="row">
                        <div className="col-10">
                            <h5 className="mt-0">{name}</h5>
                        </div>
                        <div className="col-2 text-right">
                            {user ? <button className="btn btn-success" data-toggle="modal" data-target={`#alarmModal${id}`}>Add alarm</button> : ""}
                        </div>
                        <div class="modal fade" id={`alarmModal${id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Add note on alarm for {name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text" class="form-control" aria-describedby="alarmNote" value={note} onChange={(e)=>setNote(e.target.value)}/>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={(e)=>handleClick(e, id, user, note)} data-dismiss="modal">Create alarm</button>
                                    </div>
                                </div>
                            </div>
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