import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
const axios = require("axios");

const Register = function() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState(null);
    const { setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = function(event) {
        event.preventDefault();
        axios.post("/api/register", { email, password, password2 })
        .then(function(response) {
            console.log(response.data);
            if (response.data.error) {
                
            } else {
                setUser(response.data.email);
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
                        <h5 className="card-header">Register an account</h5>
                        <div className="card-body text-left">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword2" value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
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

export default Register;