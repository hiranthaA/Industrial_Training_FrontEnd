import React, { Component } from 'react';
import './content.css';
import Axios from 'axios';
import SupervisorTable from './supervisorTable';

class ContentOne extends Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.setCompany = this.setCompany.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setContact = this.setContact.bind(this);
        this.setDesignation = this.setDesignation.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfPassword = this.setConfPassword.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateDesignation = this.validateDesignation.bind(this);
        this.validateContact = this.validateContact.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validate = this.validate.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.state = {
            loggeduser: null,
            companydetails: null,
            companyName: null,
            supervisors: null,
            fname: null,
            lname: null,
            company: null,
            title: "Mr.",
            email: null,
            contact: null,
            designation: null,
            password: null,
            cpassword: null,
            istableupdated : false
        }
    }

    componentWillMount() {
        this.setLoggedUser(this.props.loggeduser);
        console.log(this.props.loggeduser);
    }

    componentDidMount() {
        this.setCompany(this.state.loggeduser.id);
    }

    setCompany() {
        Axios.get('http://localhost:9000/company/getcompany/' + this.state.loggeduser.id).then(function(data) {
            this.setState({ companyName: data.data.cmpName });
            this.setState({ companydetails: data.data });
            this.setState({ company: data.data.cmpId });
            console.log(this.state.companydetails);
        }.bind(this));
    }

    setLoggedUser(e) {
        console.log(e);
        this.setState({ loggeduser: e });
    }

    setFirstName(e) {
        console.log(e.target.value);
        this.setState({ fname: e.target.value });
    }

    setLastName(e) {
        console.log(e.target.value);
        this.setState({ lname: e.target.value });
    }

    setTitle(e) {
        console.log(e.target.value);
        this.setState({ title: e.target.value });
    }

    setEmail(e) {
        console.log(e.target.value);
        this.setState({ email: e.target.value });
    }

    setContact(e) {
        console.log(e.target.value);
        this.setState({ contact: e.target.value });
    }

    setDesignation(e) {
        console.log(e.target.value);
        this.setState({ designation: e.target.value });
    }

    setPassword(e) {
        console.log(e.target.value);
        this.setState({ password: e.target.value });
    }

    setConfPassword(e) {
        console.log(e.target.value);
        this.setState({ cpassword: e.target.value });
    }

    clearForm() {
        console.log("clear form started");
        this.state.fname=null;
        this.state.lname=null;
        this.state.title="Mr.";
        this.state.email=null;
        this.state.contact=null;
        this.state.designation=null;
        this.state.password=null;
        this.state.cpassword=null;
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("designation").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contact").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confpassword").value = "";
        document.getElementById("titleselect").value = "Mr.";
    }

    validateFirstName() {
        var fnameok = true;
        if (this.state.fname === null || this.state.fname === "") {
            console.log("fname false");
            fnameok = false;
        }
        return fnameok;
    }

    validateLastName() {
        var lnameok = true;
        if (this.state.lname === null || this.state.lname === "") {
            console.log("lname false");
            lnameok = false;
        }
        return lnameok;
    }

    validateDesignation() {
        var desigok = true;
        if (this.state.designation === null || this.state.designation === "") {
            console.log("designation false");
            desigok = false;
        }
        return desigok;
    }

    validateEmail() {
        var emailok = true;
        if (this.state.email === null || this.state.email === "") {
            console.log("email false");
            emailok = false;
        }
        return emailok;
    }

    validateContact() {
        var contactok = true;
        if (this.state.contact === null || this.state.contact === "" || this.state.contact.length != 10) {
            console.log("contact false");
            contactok = false;
        }
        return contactok;
    }

    validatePassword() {
        var passok = true;
        if (this.state.password === null || this.state.password === "") {
            console.log("password false");
            passok = false;
        }
        else {
            if (this.state.password !== this.state.cpassword) {
                console.log("password do not match");
                passok = false;
            }
        }
        return passok;
    }

    validate() {
        if (this.validateFirstName() & this.validateLastName() & this.validateContact() & this.validateDesignation() & this.validateEmail() & this.validatePassword()) {
            console.log("validation success");
            var supvsr = {
                fname: this.state.fname,
                lname: this.state.lname,
                companyid: this.state.company,
                title: this.state.title,
                email: this.state.email,
                contact: this.state.contact,
                designation: this.state.designation,

            }

            Axios.post('http://localhost:9000/supervisor/add', supvsr).then(function(data) {
                console.log(data.data);
                return data.data;
            }.bind(this)).then(function(object) {
                let supData = object;
                console.log(supData);
                var usr = {
                    id: supData.id,
                    email: this.state.email,
                    password: this.state.password,
                    type: "supervisor"
                }
                Axios.post('http://localhost:9000/user/addUser', usr).then(function() {
                    console.log("successfully inserted");
                });
                return supData;
            }.bind(this)).then(function(usr) {
                this.child.current.getSupervisorList();
                window.$('#addSupModal').modal('hide');
                alert("Supervisor Added Successfully");
                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";
                document.getElementById("designation").value = "";
                document.getElementById("email").value = "";
                document.getElementById("contact").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confpassword").value = "";
                document.getElementById("titleselect").value = "Mr."
            }.bind(this));

        }
        else {
            console.log("validation failed");
            alert("Invalid Submit. Please check your entries and try again!");
        }
    }
    render() {
        return (
            <div className="content">
                <div className="card content">
                    <div className="card-header bg-secondary">
                        Supervisors : {this.state.companyName}
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <button type="button" class="btn btn-outline-info float-left" id="btnaddnew" data-toggle="modal" data-target="#addSupModal" onClick={this.clearForm}>Add New</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" id="formContainer">
                        <div class="table-responsive">
                            <SupervisorTable ref={this.child} currentCompany={this.state.loggeduser.id} updatetable={this.istableupdated} />
                        </div>
                    </div>
                </div>

                <div class="modal fade bd-example-modal-lg" id="addSupModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className="card-body" id="formContainer">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <h4>Add Supervisor</h4>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div className="card-body" id="formContainer">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-sm-2">
                                                    <div className="form-group">
                                                        <label id="label">Title</label>
                                                        <select class="custom-select" id="titleselect" onChange={this.setTitle} >
                                                            <option value="Mr." selected>Mr.</option>
                                                            <option value="Ms.">Ms.</option>
                                                            <option value="Mrs.">Mrs.</option>
                                                            <option value="Dr.">Dr.</option>
                                                            <option value="Prof.">Prof.</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label" >First Name</label>
                                                        <input type="text" onChange={this.setFirstName} className="form-control" id="fname" placeholder="First Name"></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Last Name</label>
                                                        <input type="text" onChange={this.setLastName} className="form-control" id="lname" placeholder="Last Name"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Designation</label>
                                                        <input type="text" onChange={this.setDesignation} className="form-control" id="designation" placeholder="Designation"></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Email</label>
                                                        <input type="email" onChange={this.setEmail} className="form-control" id="email" placeholder="Email"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Contact No</label>
                                                        <input type="number" onChange={this.setContact} className="form-control" id="contact" placeholder="Contact No"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Password</label>
                                                        <input type="password" onChange={this.setPassword} className="form-control" id="password" placeholder="Password"></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label id="label">Confirm Password</label>
                                                        <input type="password" onChange={this.setConfPassword} className="form-control" id="confpassword" placeholder="Confirm Password"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <button type="button" class="btn btn-success" id="btnaddsup" onClick={() => this.validate()}>Add Supervisor</button>
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

export default ContentOne;