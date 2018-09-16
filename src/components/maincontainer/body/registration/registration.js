import React, { Component } from 'react';
import './registration.css';

class Registration extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content card ">
        <div className="card header">

          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Student Registration</a>
              <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Company Registration</a>
            </div>
          </nav>
        </div>

        <div className="card body">
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className="content card ">

                <div className="card-header">
                  <h4 className="heading "><i class="fas fa-user-plus"></i> Student Registration</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-md-6">

                      <div className="row">
                        <div className="col-sm-6 col-md-6">
                          <div className="form-group">
                            <label id="label" >Student ID</label>
                            <input type="text" className="form-control" id="studentID" placeholder="Student ID"></input>
                          </div>
                        </div>

                        <div className="col-sm-6 col-md-2">
                          <div className="form-group">
                            <label id="label">Year</label>
                            <input type="number" min='1' max='4' className="form-control" id="year" placeholder="Year" ></input>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="form-group">
                            <label id="label">Semester</label>
                            <input type="number" min='1' max='2' className="form-control" id="semester" placeholder="Sem"></input>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="form-group">
                            <label id="label">GPA</label>
                            <input type="number" min='1' max='4' className="form-control" id="gpa" placeholder="GPA" ></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label id="label">Student Name</label>
                            <input type="text" className="form-control" id="studentName" placeholder="Student Name"></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label id="label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email"></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label id="label">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="Student Address"></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label id="label">Mobile</label>
                            <input type="number" className="form-control" id="mobile" placeholder="Mobile"></input>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label id="label">Home</label>
                            <input type="number" className="form-control" id="home" placeholder="Home"></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label id="label">Password</label>
                            <input type="password" className="form-control" id="studentPassword" placeholder="Password"></input>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label id="label">Password</label>
                            <input type="password" className="form-control" id="studentPasswordConf" placeholder="Confirm Password"></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 ml-auto">
                          <button type="button" class="btn btn-outline-primary btn-block" onClick={this.addStudent} >Register</button>
                        </div>
                      </div>


                    </div>

                  </div>
                </div>

              </div>

            </div>


            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

              <div class="card">
                <div className="card-header">
                  <h4 className="heading "><i class="fas fa-user-plus"></i> Company Registration</h4>
                </div>
                <div class="card-body" >

                  <form onSubmit={this.addCompany}>

                    <div class="form-group row">
                      <label className="grey-text">Company Name</label>
                      <input type="text" placeholder="eg: ABC Company" id="defaultFormRegistercmpNameEx" className="form-control w-100" /><br />

                    </div>
                    <div class="form-group row">
                      <label className="grey-text">Address</label>
                      <input type="text" placeholder="eg: No.1, Orugodawaththa, Colombo" id="defaultFormRegisterAddressEx" className="form-control w-100" /><br />

                    </div>

                    <div class="form-group row">
                      <label className="grey-text">Telephone(Person in charge)</label>
                      <input type="number" placeholder="eg: 0711234567" id="defaultFormRegistertpEx" className="form-control w-100" /><br />

                    </div>

                    <div class="form-group row">
                      <label className="grey-text">Email(Person in charge)</label>
                      <input type="email" placeholder="eg: someone@abc.com" id="defaultFormRegisterEmailEx" className="form-control w-100" /><br />

                    </div>

                    <div class="form-group row">
                      <label className="grey-text">Password</label>
                      <input type="password" id="defaultFormRegisterPasswrdEx" className="form-control w-100" /><br />

                    </div>

                    <div class="form-group row">
                      <label className="grey-text">Confirm Password</label>
                      <input type="password" id="defaultFormRegisterPasswrdConEx" className="form-control w-100" /><br />

                    </div>

                    <div class="form-group row">
                      <div class="offset-sm-2 col-sm-8 pb-3 pt-2">
                        <button type="submit" class="btn btn-outline-primary btn-block" >Register</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

  addCompany() {

    var cmpname = document.getElementById("defaultFormRegistercmpNameEx").value;
    var address = document.getElementById("defaultFormRegisterAddressEx").value;
    var tele = document.getElementById("defaultFormRegistertpEx").value;
    var email = document.getElementById("defaultFormRegisterEmailEx").value;
    var password = document.getElementById("defaultFormRegisterPasswrdEx").value;
    var confPassword = document.getElementById("defaultFormRegisterPasswrdConEx").value;

    if (cmpname === "") {
      alert("Fill the name");
    } else if (address === "") {
      alert("Fill the address");
    } else if (tele === "") {
      alert("Fill the telephone");
    } else if (email === "") {
      alert("Fill the email");
    } else if (password === "") {
      alert("Fill the password");
    } else if (email === "") {
      alert("Fill the email");
    } else if (password !== confPassword) {
      alert("Password entered doesn't match");
    } else if (tele.length !== 10) {
      alert("Invalid telephone number");
    } else {
      var obj = {
        cmpName: cmpname,
        address: address,
        contact: tele,
        email: email,
        password: password
      };


      fetch('http://localhost:9000/company/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        var id = (responseData.cmpId);
        var objUser = {
          id: id,
          email: email,
          password: password,
          type: "company"
        };
        return fetch('http://localhost:9000/user/addUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objUser)
        }).then(function () {
          alert("Company Registered Succesfully");
          window.location.reload();
        });

      });


    }

  }

  addStudent() {
    var itNo = document.getElementById("studentID").value;
    var year = document.getElementById("year").value;
    var semester = document.getElementById("semester").value;
    var gpa = document.getElementById("gpa").value;
    var studentName = document.getElementById("studentName").value;
    var address = document.getElementById("address").value;
    var mobileNo = document.getElementById("mobile").value;
    var homeNo = document.getElementById("home").value;
    var email = document.getElementById("email").value;
    var studentPass = document.getElementById("studentPassword").value;
    var studentPassConf = document.getElementById("studentPasswordConf").value;

    if (itNo === ""||itNo.length!==10) {
      alert("Invalid IT number");
    } else if (year === ""||year>4) {
      alert("Invalid Year");
    } else if (semester === ""||semester>2||semester<1) {
      alert("Invalid Semester Details");
    } else if (gpa === ""||gpa>4||gpa<0) {
      alert("Invalid GPA detials");
    } else if (studentName === "") {
      alert("Invalid student name");
    } else if (address === "") {
      alert("Invalid address details");
    } else if (email === "") {
      alert("Fill the email");
    } else if (mobileNo==""||mobileNo.length !==10) {
      alert("Invalid MobileNo");
    } else if (studentPass !== studentPassConf) {
      alert("Password entered doesn't match");
    } else if (homeNo == "") {
      alert("Invalid Home TelephoneNo");
    } else {

      let student = {
        itNo: itNo,
        studentName: studentName,
        address: address,
        mobileNo: mobileNo,
        homeNo: homeNo,
        email: email,
        year: year,
        semester: semester,
        gpa: gpa
      };
      fetch('http://localhost:9000/student/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      }).then(function (data) {
        return data.json();

      }).then(function (data) {
        console.log("return2", data);
        var id = (data.id);
        var objUser = {
          id: id,
          email: email,
          password: studentPass,
          type: "student"
        };
        return fetch('http://localhost:9000/user/addUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objUser)
        }).then(function () {
          alert("Student Registration Succesfull");
          window.location.reload();
        });

      }

      )
    }
  }

}

export default Registration;