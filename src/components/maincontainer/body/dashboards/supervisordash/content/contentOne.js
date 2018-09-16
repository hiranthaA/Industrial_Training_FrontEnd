import React, { Component } from 'react';
import './content.css';
import Axios from "axios";

class ContentOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formId: ""
        }
    }

    componentDidMount(){
        // debugger;
        console.log(this.props);
        this.getSupervisorDetails();
    }

//5b94d8acc4af1d200c031544

    getSupervisorDetails(){
        Axios.get('http://localhost:9000/supervisor/get/'+this.props.loggeduser.email).then(function (data) {
            console.log(data.data);
            return data.data;
        }.bind(this)).then(function (object) {
            let logdata = object;
            console.log(logdata);
            return logdata;
        }.bind(this)).then(function (supervisor) {
            document.getElementById("supervisorName").value=supervisor.fname + " " + supervisor.lname;
            document.getElementById("supervisorPhone").value=supervisor.contact;
            document.getElementById("supervisorTitle").value=supervisor.designation;
            document.getElementById("supervisorEmail").value=supervisor.email;
        });
    }

    // getForms(){
    //     Axios.get('http://localhost:9000/forms/formi1/supervisorEmail/'+ this.props.loggeduser.email +'/status/PARTIAL').then(function (data) {
    //         console.log(data.data);
    //         return data.data;
    //     }.bind(this)).then(function (object) {
    //         let logdata = object;
    //         console.log(logdata);
    //         return logdata;
    //     }.bind(this)).then(function (form) {
    //         this.setState({ formId: form.studentId });
    //     });
    // }

    render() {
        return (
            <div className="contentS card ">

                <div className="card-header">
                    <h4 className="heading ">{this.props.loggeduser.email}</h4>
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
                                        <input type="email" className="form-control" id="supervisorEmail" placeholder="Email"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="label">Internship Start Date</label>
                                        <input type="date" className="form-control" id="internshipStartDate" placeholder="Start Date"></input>
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
                                        <label id="label">Please list the tasks the student is expected to complete</label>
                                        {/* <input type="text" className="form-control" id="expectedTasks" placeholder="Tasks"></input> */}
                                        <textarea id="expectedTasks" cols="75" rows="5" placeholder="Tasks"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label id="label">List what the student will learn during the internship period</label>
                                        {/* <input type="text" className="form-control" id="learningOutcomes" placeholder="Learning outcomes"></input> */}
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

        fetch('http://localhost:9000/forms/formi1/id/'  + '5b94ccd6c4af1d41d03da9fa', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function (response) {
            alert("Form Updated Succesfully");
            return response.json();
        }).then(function (responseData) {
            console.log(responseData);
        });
    }


}

export default ContentOne;