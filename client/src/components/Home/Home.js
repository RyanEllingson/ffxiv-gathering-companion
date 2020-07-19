import React from "react";
import "./Home.css";

const Home = function() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="jumbotron text-light border border-light">
                        <h1 className="display-2">Final Fantasy XIV Gathering Companion</h1>
                        <p className="lead">An indispensible partner in your collectible botany and mining endeavors!</p>
                        <hr className="my-4" />
                        <p>Navigate to "Find Items" to find any information you may need on collectible gatherables.  Click on "Register" to create an account or "Login" to log into an existing account.  Logged in users may create alarms alerting them when items are ready to be gathered!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;