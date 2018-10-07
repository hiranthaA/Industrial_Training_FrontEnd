import React, { Component } from 'react';
import './content.css';
import Axios from "axios";

class ContentOne extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            supervisorEmail: "",
            supervisorFName: "",
            supervisorCompanyId: "",
            formId: "",
            formList: []
        }
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.loggeduser.email!=null){
            this.getSupervisorDetails();
            this.getForms();
        }
    }

    getForms(){
        console.log("Calling getForms");
        this.setState({ formList: [] });
        Axios.get('http://localhost:9000/forms/formi1/supervisorEmail/'+this.props.loggeduser.email+'/status/PARTIAL').then(function (data) {
            console.log(data.data);
            this.setState({ formList: data.data });
        }.bind(this));
    }

    getSupervisorDetails(){
        Axios.get('http://localhost:9000/supervisor/get/'+this.props.loggeduser.email).then(function (data) {
            console.log(data.data);
            this.setState({ supervisorFName: data.data.fname });
            var companyId = data.data.companyid;
            this.setState({ supervisorCompanyId: data.data.companyid });
            document.getElementById("supervisorName").value=data.data.title + " " + data.data.fname + " " + data.data.lname;
            document.getElementById("supervisorPhone").value=data.data.contact;
            document.getElementById("supervisorTitle").value=data.data.designation;
            document.getElementById("supervisorEmail").value=data.data.email;

            if(companyId != null){
                Axios.get('http://localhost:9000/company/getcompany/'+companyId).then(function (data) {
                    console.log(data.data);
                    document.getElementById("companyName").value=data.data.cmpName;
                    document.getElementById("companyAddres").value=data.data.address;
                });
            }
        }.bind(this));
    }

    loadForm(e){
        let studentID = e.currentTarget.getAttribute('studentId');
        console.log("studentMail IS: " + studentID);
        console.log(studentID);
        Axios.get('http://localhost:9000/forms/formi1/'+studentID).then(function (data) {
            console.log(data.data);
            document.getElementById("formID").value=data.data.formId;
        }.bind(this));
    }

    render() {

        if (this.state.formList.length>0) {
            var tContent = (
            <table className="table table-hover">
            <tbody>
            {
                this.state.formList.map((val, i) => {
                return (
                    <tr key={i}>
                    <td class="align-middle text-left"><span class="text-info">{val.studentName}</span></td>
                    <td class="align-middle text-left"><span class="text-info">{val.studentEmail}</span></td>
                    <td><button type="button" class="btn btn-outline-info float-right" id="test" data-toggle="modal" data-target="#formi1Modal" studentId={val.studentId} onClick={this.loadForm}>View</button></td>
                </tr>
                );
                })
            }
            </tbody>
            </table>
            );
        }else{
            var tContent = (<span class="text-info text-left">No forms to fill.</span>);
        }

        return (
            <div className="content card ">
                <div className="card-header">
                    <h4 id="greeting" className="heading ">Hi, {this.state.supervisorFName}</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-sm-6 col-md-6 text-left">
                                    {tContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade bd-example-modal-lg" id="formi1Modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className="card-header">
                                <h4 id="greeting" className="heading ">Form-I-1</h4>
                                <input type="hidden" id="formID"></input>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-8 col-md-8">

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label id="label">Employer's Name</label>
                                                    <input type="text" className="form-control" id="companyName" placeholder="Name"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label id="label">Employer's Address</label>
                                                    <input type="text" className="form-control" id="companyAddres" placeholder="Address"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Supervisor's Name</label>
                                                    <input type="text" className="form-control" id="supervisorName" placeholder="Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Supervisor's Phone</label>
                                                    <input type="number" className="form-control" id="supervisorPhone" placeholder="Phone"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Supervisor's Title</label>
                                                    <input type="text" className="form-control" id="supervisorTitle" placeholder="Title"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Supervisor's Email</label>
                                                    <input type="email" className="form-control" id="supervisorEmail" placeholder="Email" disabled></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Internship Start Date</label>
                                                    <input type="date" className="form-control" id="internshipStartDate" ></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">Internship End Date</label>
                                                    <input type="date" className="form-control" id="internshipEndDate" placeholder="End Date"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="label">No of Hours / Week</label>
                                                    <input type="number" min="1" max="100" className="form-control" id="hoursPerWeek" placeholder="Hours"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Please list the tasks the student is expected to complete</label>
                                                    <textarea id="expectedTasks" cols="75" rows="5" placeholder="Tasks"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>List what the student will learn during the internship period</label>
                                                    <textarea id="learningOutcomes" cols="75" rows="5" placeholder="Learning outcomes"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3 ml-auto">
                                                <button type="button" class="btn btn-outline-primary btn-block" onClick={this.submitForm} >Submit</button>
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

    submitForm(){
        var error=false;
        var companyName = document.getElementById("companyName").value;
        error = companyName ? false : true;
        var companyAddres = document.getElementById("companyAddres").value;
        error = companyAddres ? false : true;
        var supervisorName = document.getElementById("supervisorName").value;
        error = supervisorName ? false : true;
        var supervisorPhone = document.getElementById("supervisorPhone").value;
        error = supervisorPhone ? false : true;
        var supervisorTitle = document.getElementById("supervisorTitle").value;
        error = supervisorTitle ? false : true;
        var supervisorEmail = document.getElementById("supervisorEmail").value;
        error = supervisorEmail ? false : true;
        var internshipStartDate = document.getElementById("internshipStartDate").value;
        error = internshipStartDate ? false : true;
        var internshipEndDate = document.getElementById("internshipEndDate").value;
        error = internshipEndDate ? false : true;
        var hoursPerWeek = document.getElementById("hoursPerWeek").value;
        error = hoursPerWeek ? false : true;
        var expectedTasks = document.getElementById("expectedTasks").value;
        error = expectedTasks ? false : true;
        var learningOutcomes = document.getElementById("learningOutcomes").value;
        error = learningOutcomes ? false : true;
        var externalSupervisorName = supervisorName;
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

        var formData = {
            companyName: companyName,
            companyAddres: companyAddres,
            supervisorName: supervisorName,
            supervisorPhone: supervisorPhone,
            supervisorTitle: supervisorTitle,
            supervisorEmail : supervisorEmail,
            internshipStartDate : internshipStartDate,
            internshipEndDate: internshipEndDate,
            hoursPerWeek: hoursPerWeek,
            expectedTasks: expectedTasks,
            learningOutcomes: learningOutcomes,
            externalSupervisorName: externalSupervisorName,
            date: date
        };

        if(error){
            alert("All the fields are required!");
            return;
        }

        var formID = document.getElementById("formID").value;
        console.log(formData);
        var comp = this;

        fetch('http://localhost:9000/forms/formi1/id/'  + formID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function (response) {
            if(response!=null){
                alert("Form Updated Succesfully!");
                window.$('#formi1Modal').modal('hide');
                comp.getForms();
                console.log(response.json());
            }else{
                alert("Form Updated Failed!");
            }
        });
    }
}

export default ContentOne;