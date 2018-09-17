import React, { Component } from 'react';
import Axios from 'axios';

class SupervisorTable extends Component {
    constructor(props) {
        super(props);
        this.getSupervisorDetailsToEdit = this.getSupervisorDetailsToEdit.bind(this);
        this.getSupervisorList = this.getSupervisorList.bind(this);
        this.setEditContact = this.setEditContact.bind(this);
        this.setEditDesignation = this.setEditDesignation.bind(this);
        this.setEditEmail = this.setEditEmail.bind(this);
        this.setEditFname = this.setEditFname.bind(this);
        this.setEditLname = this.setEditLname.bind(this);
        this.setEditTitle = this.setEditTitle.bind(this);
        this.state = {
            supervisorList: [],
            editid : null,
            editcontact: null,
            editdesignation: null,
            editemail: null,
            editfname: null,
            editlname: null,
            edittitle: null
        }
    }

    setEditId(id){
        this.setState({ editid :id });
    }

    setEditContact(cont) {
        console.log(cont.target.value);
        this.setState({ editcontact: cont.target.value });
    }

    setEditDesignation(desig) {
        this.setState({ editdesignation: desig.target.value });
    }

    setEditEmail(e) {
        this.setState({ editemail: e.target.value });
    }

    setEditFname(e) {
        this.setState({ editfname: e.target.value });
    }

    setEditLname(ln) {
        this.setState({ editlname: ln.target.value });
    }

    setEditTitle(t) {
        this.setState({ edittitle: t.target.value });
    }

    componentWillMount() {
        this.getSupervisorList();
    }

    getSupervisorList() {
        Axios.get('http://localhost:9000/supervisor/getsupervisors/' + this.props.currentCompany).then(function (supvsr) {
            console.log(supvsr.data);
            this.setState({ supervisorList: supvsr.data });
            return supvsr.data;
        }.bind(this)).then(function (data) {
            console.log(data)

        }.bind(this));
    }

    getSupervisorDetailsToEdit(e) {
        this.setEditId(e.target.id);
        Axios.get('http://localhost:9000/supervisor/getsupervisor/' + e.target.id).then(function (data) {
            console.log(data.data);
            return data.data;
        }.bind(this)).then(function (data) {
            this.setState({editfname : data.fname});
            this.setState({editlname : data.lname});
            this.setState({editcontact : data.contact});
            this.setState({editdesignation : data.designation});
            this.setState({editemail : data.email});
            this.setState({edittitle : data.title});
        }.bind(this));
    }

    validateEditFirstName() {
        var fnameok = true;
        if (this.state.editfname === null || this.state.editfname === "") {
            console.log("fname false");
            fnameok = false;
        }
        return fnameok;
    }

    validateEditLastName() {
        var lnameok = true;
        if (this.state.editlname === null || this.state.editlname === "") {
            console.log("lname false");
            lnameok = false;
        }
        return lnameok;
    }

    validateEditDesignation() {
        var desigok = true;
        if (this.state.editdesignation === null || this.state.editdesignation === "") {
            console.log("designation false");
            desigok = false;
        }
        return desigok;
    }

    validateEditEmail() {
        var emailok = true;
        if (this.state.editemail === null || this.state.editemail === "") {
            console.log("email false");
            emailok = false;
        }
        return emailok;
    }

    validateEditContact() {
        var contactok = true;
        if (this.state.editcontact === null || this.state.editcontact === "" || this.state.editcontact.length != 10) {
            console.log("contact false");
            contactok = false;
        }
        return contactok;
    }

    validateEdit() {
        if (this.validateEditFirstName() & this.validateEditLastName() & this.validateEditContact() & this.validateEditDesignation() & this.validateEditEmail()) {
            console.log("validation success");
            var supvsredited = {
                id : this.state.editid,
                fname: this.state.editfname,
                lname: this.state.editlname,
                companyid: this.props.currentCompany,
                title: this.state.edittitle,
                email: this.state.editemail,
                contact: this.state.editcontact,
                designation: this.state.editdesignation
            }

            Axios.post('http://localhost:9000/supervisor/add', supvsredited).then(function (data) {
                console.log(data.data);
                return data.data;
            }.bind(this)).then(function (object) {
                var editedusr = {
                    id: this.state.editid,
                    email: this.state.editemail,
                }
                Axios.post('http://localhost:9000/user/updateUser', editedusr).then(function () {
                    console.log("successfully updated");
                    alert("Supervisor Updated Successfully!");
                    
                });
                return object;
            }.bind(this)).then(function (usr) {
                // alert("Supervisor Added Successfully");
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
            console.log("validation failed");
            alert("Invalid Submit. Please check your entries and try again!");
        }
    }


    render() {

        let table;

        if (this.state.supervisorList.length !== 0) {
            console.log("data available");
            console.log(this.state.supervisorList.length);
            table = (
                <table className="table table-hover table-active">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.supervisorList.map((supvsr, i) => {
                            return (
                                <tr key={i}>
                                    <td>{supvsr.title + " " + supvsr.fname + " " + supvsr.lname}</td>
                                    <td>{supvsr.designation}</td>
                                    <td>{supvsr.contact}</td>
                                    <td>{supvsr.email}</td>
                                    <td><button type="button" className="btn btn-outline-info" id={supvsr.id} data-toggle="modal" data-target=".bd-example-modal-lg" onClick={this.getSupervisorDetailsToEdit}>Edit</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
        else {
            table = "No Supervisors Available";
        }

        return (
            <div>
                {table}


                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className="card-body" id="formContainer">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <h4>Edit Supervisor</h4>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label id="label">Title</label>
                                                    <select value={this.state.edittitle} class="custom-select" id="titleselect" onChange={this.setEditTitle} >
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
                                                    <input type="text" value={this.state.editfname} onChange={this.setEditFname} className="form-control" id="fname" placeholder="First Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Last Name</label>
                                                    <input type="text" value={this.state.editlname} onChange={this.setEditLname} className="form-control" id="lname" placeholder="Last Name"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Designation</label>
                                                    <input type="text" value={this.state.editdesignation} onChange={this.setEditDesignation} className="form-control" id="designation" placeholder="Designation"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Email</label>
                                                    <input type="email" value={this.state.editemail} onChange={this.setEditEmail} className="form-control" id="email" placeholder="Email"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Contact No</label>
                                                    <input type="number" value={this.state.editcontact} onChange={this.setEditContact} className="form-control" id="contact" placeholder="Contact No"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button type="button" class="btn btn-success float-right" id="btnaddsup" onClick={() => this.validateEdit()}>Save</button>
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

export default SupervisorTable;