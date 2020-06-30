import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./components/Home";
import Items from "./components/Items";
import Clock from "./components/Clock";

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <span className="navbar-brand">FFXIV GC</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Clock />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/items" exact className="nav-link" activeClassName="active">Find Items</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      
      <Switch>
        <Route path="/items">
          <Items />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
