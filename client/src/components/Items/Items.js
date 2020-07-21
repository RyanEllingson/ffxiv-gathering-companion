import React, { useState } from "react";
import ItemCard from "../ItemCard";
import AlarmModal from "../AlarmModal";
import { getAllItems, getBotanyItems, getMiningItems, getEphemeralItems, searchForItem } from "../../functions/items";
import "./Items.css";

const Items = function() {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState(null);

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card text-center dropdown">
                        <h4 className="card-header bg-dark text-light">
                            Find gatherables
                        </h4>
                        <div className="card-body bg-light">
                            <h5 className="card-title">Click one of the buttons below to find items</h5>
                            <button className="btn btn-primary card-link mt-1 first" onClick={(e)=>getAllItems(e, setItems)}>Get all items</button>
                            <button className="btn btn-primary card-link mt-1 second" onClick={(e)=>getBotanyItems(e, setItems)}>Get all botany items</button>
                            <button className="btn btn-primary card-link mt-1 third" onClick={(e)=>getMiningItems(e, setItems)}>Get all mining items</button>
                            <button className="btn btn-primary card-link mt-1 fourth" onClick={(e)=>getEphemeralItems(e, setItems)}>Get all ephemeral nodes</button>
                            <button className="btn btn-primary card-link mt-1 fifth" type="button" data-toggle="collapse" data-target="#collapseMenu" aria-haspopup="true" aria-expanded="false">Open search form</button>
                            <form className="collapse form-inline p-4" id="collapseMenu">
                                <div className="form-group ml-auto">
                                    <label htmlFor="exampleDropdownFormEmail2">Find item by name</label>
                                    <input type="text" className="form-control mx-3" id="exampleDropdownFormEmail2" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                                </div>
                                <button type="submit" class="btn btn-primary mr-auto" onClick={(e)=>searchForItem(e, searchTerm, setItems)}>Search</button>
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
                                return <li className="list-group-item bg-light">
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
                                        <AlarmModal id={item.id} name={item.item_name} />
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