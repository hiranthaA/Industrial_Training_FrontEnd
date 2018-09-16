import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = {
            username: null,
            password: null
        }
    }

    componentWillMount(){
        this.props.setview("login",null);
    }

    setUsername(e) {
        console.log(e.target.value);
        this.setState({ username: e.target.value });
    }

    setPassword(e) {
        console.log(e.target.value);
        this.setState({ password: e.target.value });
    }

    validateLogin() {
        if (this.state.username === null || this.state.username === "" || this.state.password === null || this.state.password === "") {
            return false;
        }
        else {
            return true;
        }
    }

    handleLoginClick() {
        if (this.validateLogin()) {
            console.log("username or password validation success");

            Axios.get('http://localhost:9000/user/username/'+this.state.username+'/password/'+this.state.password).then(function (data) {
                console.log(data.data);
                return data.data;
            }.bind(this)).then(function (object) {
                let logdata = object;
                console.log(logdata);
                if(logdata===""){
                    console.log("No User Found");
                    alert("Invalid User. Try Again");
                }
                else{
                    console.log("logdata recieved");
                    this.props.setview(logdata.type,logdata);
                }
                return logdata;
            }.bind(this)).then(function (usr) {
                //alert("Supervisor addded. User Updated");
                // document.getElementById("fname").value = "";
                // document.getElementById("lname").value = "";
                // document.getElementById("designation").value = "";
                // document.getElementById("email").value = "";
                // document.getElementById("contact").value = "";
                // document.getElementById("password").value = "";
                // document.getElementById("confpassword").value = "";
                // document.getElementById("titleselect").value = "Mr."
            });
        }
        else {
            console.log("username or password validation fails");
            alert("Invalid User Credentials. Try Again");
        }
    }





    render() {
        return (
            <div>
                <div class="container py-5"></div>
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center text-white mb-4">Bootstrap 4 Login Form</h2>
                        <div class="row">
                            <div class="col-md-6 mx-auto">
                                <div class="card rounded-0">
                                    <div class="card-header">
                                        <h3 class="mb-0">Login</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="usr">Username:</label>
                                            <input type="text" onChange={this.setUsername} class="form-control" id="usr" />
                                        </div>
                                        <div class="form-group">
                                            <label for="pwd">Password:</label>
                                            <input type="password" onChange={this.setPassword} class="form-control" id="pwd" />
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6 ">
                                                        <button type="button" class="btn btn-info btn-block p-2" onClick={() => this.props.setview("registration")}><i class="fas fa-user-plus"></i> Register</button>
                                                        {/*<button type="button" class="btn btn-success p-2" onClick={this.handleLoginClick}>Login</button>*/}
                                                    </div>
                                                    <div className="col-md-6 ml-auto">
                                                        {/*<button type="button" class="btn btn-info btn-block p-2" onClick={() => this.props.setview("registration")}>Register</button>*/}
                                                        <button type="button" class="btn btn-success btn-block p-2" onClick={this.handleLoginClick}><i class="fas fa-user"></i> Login</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
