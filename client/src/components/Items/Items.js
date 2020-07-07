import React, { useState } from "react";
import ItemCard from "../ItemCard";
import AlarmModal from "../AlarmModal";
import "./Items.css";
const axios = require("axios");

const Items = function() {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState(null);

    const getAllItems = function(event) {
        event.preventDefault();
        axios.get("/api/items")
        .then((response) => {
            setItems(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const getBotanyItems = function(event) {
        event.preventDefault();
        axios.get("/api/items/botany")
        .then((response) => {
            setItems(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const getMiningItems = function(event) {
        event.preventDefault();
        axios.get("/api/items/mining")
        .then((response) => {
            setItems(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const searchForItem = function(event) {
        event.preventDefault();
        axios.get(`/api/items/${searchTerm}`)
        .then((response) => {
            setItems(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const createAlarm = function(event, id, email, note) {
        event.preventDefault();
        axios.post("/api/alarms", {
            email: email,
            itemId: id,
            notes: note
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card text-center dropdown">
                        <h4 className="card-header">
                            Find gatherables
                        </h4>
                        <div className="card-body">
                            <h5 className="card-title">Click one of the buttons below to find items</h5>
                            <button className="btn btn-primary card-link mt-1 first" onClick={(e)=>getAllItems(e)}>Get all items</button>
                            <button className="btn btn-primary card-link mt-1 second" onClick={(e)=>getBotanyItems(e)}>Get all botany items</button>
                            <button className="btn btn-primary card-link mt-1 third" onClick={(e)=>getMiningItems(e)}>Get all mining items</button>
                            <button className="btn btn-primary card-link mt-1 fourth" type="button" data-toggle="collapse" data-target="#collapseMenu" aria-haspopup="true" aria-expanded="false">Open search form</button>
                            <form className="collapse form-inline p-4" id="collapseMenu">
                                <div className="form-group ml-auto">
                                    <label htmlFor="exampleDropdownFormEmail2">Find item by name</label>
                                    <input type="text" className="form-control mx-3" id="exampleDropdownFormEmail2" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                                </div>
                                <button type="submit" class="btn btn-primary mr-auto" onClick={(e)=>searchForItem(e)}>Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {items ? <div className="row">
                <div className="col-12">
                    <div class="card mb-5">
                        <ul class="list-group">
                            {items.map((item) => {
                                return <li className="list-group-item">
                                    <ItemCard
                                        key={item.id}
                                        aetheryte={item.aetheryte}
                                        coordinates={item.coordinates}
                                        discipline={item.discipline}
                                        duration={item.duration}
                                        image={item.image_url}
                                        name={item.item_name}
                                        type={item.node_type}
                                        region={item.region}
                                        start={item.start_time}
                                    >
                                        <AlarmModal id={item.id} name={item.item_name} handleClick={createAlarm} />
                                    </ItemCard>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div> : ""}
        </div>
    );
};

export default Items;