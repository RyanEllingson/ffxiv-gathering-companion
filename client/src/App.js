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
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = function(event) {
    event.preventDefault();
    setUser(null);
    history.push("/");
  };

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <span className="navbar-brand">FFXIV GC</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Clock />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {user ? <li className="nav-item">
                <span className="nav-link active">Welcome {user}</span>
              </li> : ""}
              <li className="nav-item">
                <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/items" exact className="nav-link" activeClassName="active">Find Items</NavLink>
              </li>
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
