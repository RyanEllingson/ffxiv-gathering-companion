import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
const axios = require("axios");

const Login = function() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = function(event) {
        event.preventDefault();
        axios.post("/api/login", { email, password })
        .then(function(response) {
            console.log(response.data);
            if (response.data.error) {
                setErrors(response.data);
            } else {
                setUser(response.data.email);
                setErrors({});
                history.push("/");
            }
        }).catch(function(error) {
            console.error(error);
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card text-center">
                        <h5 className="card-header">Login to your account</h5>
                        <div className="card-body text-left">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    {errors.email ? <small className="form-text text-muted">{errors.email}</small> : ""}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                    {errors.password ? <small className="form-text text-muted">{errors.password}</small> : ""}
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;