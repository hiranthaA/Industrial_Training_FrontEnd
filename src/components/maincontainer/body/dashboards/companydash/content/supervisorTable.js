import React, { Component } from 'react';
import Axios from 'axios';
import './content.css'

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
        this.deleteSupervisor = this.deleteSupervisor.bind(this);
        this.setToDelete = this.setToDelete.bind(this);
        this.state = {
            supervisorList: [],
            editid : null,
            editcontact: null,
            editdesignation: null,
            editemail: null,
            editfname: null,
            editlname: null,
            edittitle: null,
            displaymodal : "modal",
            toDelete : null
        }
    }

    setToDelete(e){
        this.setState({toDelete : e.target.id});
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

    deleteSupervisor(e){
        console.log(this.state.toDelete);
        Axios.get('http://localhost:9000/supervisor/deletesupervisor/' + this.state.toDelete).then(function (data) {
            console.log(data);

            Axios.get('http://localhost:9000/user/deleteUser/'+this.state.toDelete).then(function(res){
                console.log(res);
            }.bind(this));

            return data;
        }.bind(this)).then(function (data) {
            if(data){
                this.getSupervisorList();
                console.log("supervisor deleted successfully");
            }
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
                    this.setState({displaymodal: "modal"});
                    alert("Supervisor Updated Successfully!");
                    window.$('#editSupModal').modal('hide');
                }.bind(this));
                return object;
            }.bind(this)).then(function (usr) {
                this.getSupervisorList();
            }.bind(this));

        }
        else {
            console.log("validation failed");
            this.setState({displaymodal: null});
            alert("Invalid Submit. Please check your entries and try again!");
        }
    }


    render() {

        let table;
        let dismis=this.state.displaymodal;

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
                                    <td className="text-left">{supvsr.title + " " + supvsr.fname + " " + supvsr.lname}</td>
                                    <td className="text-left">{supvsr.designation}</td>
                                    <td className="text-left">{supvsr.contact}</td>
                                    <td className="text-left">{supvsr.email}</td>
                                    <td className="text-left"><button type="button" className="btn btn-outline-info btnEdit" id={supvsr.id} data-toggle="modal" data-target=".bd-example-modal-lg" onClick={this.getSupervisorDetailsToEdit}>Edit</button></td>
                                    <td className="text-left"><button type="button" className="btn btn-outline-danger btnDelete" id={supvsr.id} data-toggle="modal" data-target="#deletesupmodal" onClick={this.setToDelete}>Delete</button></td>
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

                {/* edit dialog */}
                <div class="modal fade bd-example-modal-lg" id="editSupModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                                    <select value={this.state.edittitle} class="custom-select" id="titleselectedit" onChange={this.setEditTitle} >
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
                                                    <input type="text" value={this.state.editfname} onChange={this.setEditFname} className="form-control" id="fnameedit" placeholder="First Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Last Name</label>
                                                    <input type="text" value={this.state.editlname} onChange={this.setEditLname} className="form-control" id="lnameedit" placeholder="Last Name"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Designation</label>
                                                    <input type="text" value={this.state.editdesignation} onChange={this.setEditDesignation} className="form-control" id="designationedit" placeholder="Designation"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Email</label>
                                                    <input type="email" value={this.state.editemail} onChange={this.setEditEmail} className="form-control" id="emailedit" placeholder="Email"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Contact No</label>
                                                    <input type="number" value={this.state.editcontact} onChange={this.setEditContact} className="form-control" id="contactedit" placeholder="Contact No"></input>
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

                {/* delete modal */}
                <div class="modal fade" id="deletesupmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete Entry</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete this entry?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.deleteSupervisor}>Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SupervisorTable;