import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/auth";

const AlarmModal = function({ id, name, handleClick }) {
    const { user } = useContext(AuthContext);
    const [note, setNote] = useState("");

    return (
        <>
            <button className="btn btn-success" data-toggle="modal" data-target={`#alarmModal${id}`}>Add alarm</button>
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
        </>
    );
};

export default AlarmModal;