import React, { Component } from 'react';
import './content.css';
import Axios from "axios";

class ContentTwo extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      supervisorEmail: "",
      supervisorFName: "",
      supervisorCompanyId: "",
      formId: "",
      formList: [],
      currentStudent: {},
      currentSupervisor: {} 
    }
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.loggeduser.email != null) {
      this.getSupervisorDetails();
      this.getForms();
    }
  }

  getForms() {
    console.log("Calling getForms");
    this.setState({ formList: [] });
    Axios.get('http://localhost:9000/forms/formi3/supervisorEmail/' + this.props.loggeduser.email + '/status/PARTIAL').then(function (data) {
      console.log(data.data);

        this.setState({ formList: data.data });

      }.bind(this));
  }

  getSupervisorDetails() {
    Axios.get('http://localhost:9000/supervisor/get/' + this.props.loggeduser.email).then(function (data) {
      console.log(data.data);
      this.setState({ supervisorFName: data.data.fname });
    }.bind(this));
  }

  loadForm(e) {
    let formId = e.currentTarget.getAttribute('formId');
    console.log("formId IS: " + formId);
    Axios.get('http://localhost:9000/forms/formi3/id/' + formId).then(function (data) {
      console.log(data.data);
      document.getElementById("formID").value = data.data.formId;

      document.getElementById("trainingParty").value = data.data.trainingParty;
      document.getElementById("description").value = data.data.description;
      document.getElementById("fromDate").value = data.data.from;
      document.getElementById("toData").value = data.data.to;
      document.getElementById("keyTasks").value = data.data.summary;
      document.getElementById("details").value = data.data.details;

    }.bind(this));

  }


  getStudentName(email){

    // TODO: getStudentByEmail endpoint
    Axios.get("http://localhost:9000/student/get/"+email).then(
        function(response){

            console.log(response.data);
            console.log(response.data.studentName);

            return response.data.studentName;

        }.bind(this)
    ).catch(function (error) {
        console.log(error);
        alert("error");
    });
}

  render() {

    if (this.state.formList.length > 0) {
      var tContent = (
        <table className="table table-hover">
          <tbody>
            {
              this.state.formList.map((val, i) => {

                return (
                  <tr key={i}>
                    <td class="align-middle text-left"><span class="text-info">{val.studentName}</span></td>
                    <td class="align-middle text-left"><span class="text-info">{val.studentEmail}</span></td>
                    <td class="align-middle text-left"><span class="text-info">{val.from}</span></td>
                    <td class="align-middle text-left"><span class="text-info">to       {val.to}</span></td>
                    <td><button type="button" class="btn btn-outline-info float-right" id="test" data-toggle="modal" data-target="#formi3Modal" formId={val.formId} onClick={this.loadForm}>View</button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      );
    } else {
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
                <div className="col-sm-10 col-md-10 text-left">
                  {tContent}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade bd-example-modal-lg" id="formi3Modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div className="card-header">
                <h4 id="greeting" className="heading ">Form-I-3</h4>
                <input type="hidden" id="formID"></input>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 col-md-12">

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label id="label">Training Party</label>
                          <input disabled type="text" className="form-control" id="trainingParty" placeholder="Training party"></input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label id="label">Description</label>
                          <input disabled type="text" className="form-control" id="description" placeholder="Training description"></input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label id="label">From</label>
                          <input disabled type="text" className="form-control" id="fromDate" placeholder="Starting Date"></input>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label id="label">To</label>
                          <input disabled type="text" className="form-control" id="toData" placeholder="Ending Date"></input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label id="label">Key Tasks</label>
                          <textarea disabled className="form-control" cols="75" rows="5" id="keyTasks" placeholder="Summary of key tasks"></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label id="label">Details</label>
                          <textarea className="form-control" cols="75" rows="5" id="details" placeholder="Details of key tasks" disabled></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3 ml-auto">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={this.submitForm} >Attest</button>
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

  submitForm() {
    var formID = document.getElementById("formID").value;

    var formData = {
      formId: formID,
      status: "COMPLETE",
    };

    console.log(formData);
    var comp = this;

    fetch('http://localhost:9000/forms/formi3/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(function (response) {
      if (response != null) {
        alert("Form Updated Succesfully!");
        window.$('#formi3Modal').modal('hide');
        comp.getForms();
        console.log(response.json());
      } else {
        alert("Form Updated Failed!");
      }
    });
  }
}

export default ContentTwo;