import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/auth";
import { createAlarm } from "../../functions/alarms";

const AlarmModal = function({ id, name }) {
    const { user } = useContext(AuthContext);
    const [note, setNote] = useState("");

    return (
        <div className="col-5 col-sm-4 col-md-3 text-right">
            <button className="btn btn-success" data-toggle="modal" data-target={`#alarmModal${id}`}>Add alarm</button>
            <div className="modal fade" id={`alarmModal${id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-light">
                            <h5 className="modal-title" id="exampleModalLabel">Add note on alarm for {name}</h5>
                            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">
                            <input type="text" class="form-control" aria-describedby="alarmNote" value={note} onChange={(e)=>setNote(e.target.value)}/>
                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={(e)=>createAlarm(e, id, user, note)} data-dismiss="modal">Create alarm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlarmModal;