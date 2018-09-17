import React, { Component } from 'react';
import Axios from 'axios';

class SupervisorTable extends Component {
    constructor(props) {
        super(props);
        this.getSupervisorDetailsToEdit = this.getSupervisorDetailsToEdit.bind(this);
        this.getSupervisorList = this.getSupervisorList.bind(this);
        this.state = {
            supervisorList: []
        }
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
            console.log(data);
        }.bind(this));
    }

    getSupervisorDetailsToEdit(e){
        console.log(e.target.id);
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
                                    <td><button type="button" className="btn btn-outline-info" id={supvsr.id} data-toggle="modal" data-target=".bd-example-modal-lg"onClick={this.getSupervisorDetailsToEdit}>Edit</button></td>
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
        );
    }
}

export default SupervisorTable;