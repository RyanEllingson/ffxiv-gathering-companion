import React, { useContext } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useHistory
} from "react-router-dom";
import { AuthContext } from "./auth/auth";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Items from "./components/Items";
import Alarms from "./components/Alarms";
import Register from "./components/Register";
import Login from "./components/Login";
const axios = require("axios");

function App() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = function(event) {
    event.preventDefault();
    axios.get("/api/logout")
    .then(function(response) {
      if (response.data.loggedOut) {
        setUser(null);
        history.push("/");
      }
    });
    
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <Clock />
        {user ? <span>Welcome {user}</span> : ""}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/items" exact className="nav-link" activeClassName="active">Find Items</NavLink>
            </li>
            {user ? <li className="nav-item">
              <NavLink to="/alarms" exact className="nav-link" activeClassName="active">View Alarms</NavLink>
            </li> : ""}
            {user ? "" : <li className="nav-item">
              <NavLink to="/register" exact className="nav-link" activeClassName="active">Register</NavLink>
            </li>}
            {user ? "" : <li className="nav-item">
              <NavLink to="/login" exact className="nav-link" activeClassName="active">Login</NavLink>
            </li>}
            {user ? <li className="nav-item">
              <a className="nav-link" onClick={(e)=>{handleLogout(e)}} href="/">Logout</a>
            </li> : ""}
          </ul>
        </div>
      </nav>
      
      <Switch>
        <Route path="/items">
          <Items />
        </Route>
        <Route path="/alarms">
          <Alarms />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
