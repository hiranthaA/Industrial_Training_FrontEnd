import React, { Component } from 'react';
import './content.css';
import Axios from 'axios';
// import React from '../../../../../../../public/person.jpg';

class ContentTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData:{
        studentName:""
      }
    }
    this.updateStudent = this.updateStudent.bind(this);
    this.getStudentDetails=this.getStudentDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getStudentDetails();
  }

  handleChange(event) {
    console.log(event.target.value);
    console.log(event.target.value);
    console.log(event.target.id);
    // console.log("id isss"+event.target.id);
    // console.log("state isss"+this.state.userData.itNo);


    if(event.target.id=="studentName"){ 
      let user=this.state.userData;
      user.studentName=event.target.value;
      this.setState(
        {
          userData:user
      }
      );
    }
    else if(event.target.id=="studentID"){
      let user=this.state.userData;
      user.itNo=event.target.value;
      this.setState(
        {
          userData:user
      }
      );
    }

    else if(event.target.id=="address"){
      let user=this.state.userData;
      user.address=event.target.value;
      this.setState(
        {
          userData:user
      }
      );
    }
    else if(event.target.id=="mobile"){
      let user=this.state.userData;
      user.mobileNo=event.target.value;
      this.setState(
        {
          userData:user
      }
      );
    }
    else if(event.target.id=="home"){
      let user=this.state.userData;
      user.homeNo=event.target.value;
      this.setState(
        {
          userData:user
      }
      );
    }
    
  }

  render() {
    return (
      <div className="content">

        <div className="card">
          <div className="card-body">

            <div className="row">
              <div className="card-body">

                <div className="row">

                  <div className="col-sm-8 col-md-8">
                    <div className="row">
                      <div className="col-sm-6 col-md-6">
                        <img className="img-thumbnail img-responsive" src="./person.png" alt="No image" />
                      </div>

                      <div className="col-sm-6 col-md-2">
                          <label id="label">Year</label>
                          <input type="number" min='1' max='4' value={this.state.userData.year} className="form-control" id="year" placeholder="Year" ></input>
                      </div>

                      <div className="col-md-2">

                          <label id="label">Semester</label>
                          <input type="number" min='1' max='2' value={this.state.userData.semester} className="form-control" id="semester" placeholder="Sem"></input>
                      </div>

                      <div className="col-md-2">

                          <label id="label">GPA</label>
                          <input type="number" min='1' max='4' value={this.state.userData.gpa} className="form-control" id="gpa" placeholder="GPA" ></input>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">

                          <label id="label">Student Name</label>
                          <input type="text" className="form-control" value={this.state.userData.studentName} onChange={this.handleChange} id="studentName" placeholder="Student Name"></input>

                      </div>
                    </div>

                  <div className="row">
                      <div className="col-md-12">

                          <label id="label">IT Number</label>
                          <input type="text" className="form-control" value={this.state.userData.itNo} onChange={this.handleChange} id="studentID" ></input>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label id="label">Address</label>
                          <input type="text" className="form-control" value={this.state.userData.address} onChange={this.handleChange} id="address" placeholder="Student Address"></input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">

                          <label id="label">Mobile</label>
                          <input type="number" className="form-control" value={this.state.userData.mobileNo} onChange={this.handleChange} id="mobile" placeholder="Mobile"></input>

                      </div>
                      <div className="col-md-6">

                          <label id="label">Home</label>
                          <input type="number" className="form-control" value={this.state.userData.homeNo} onChange={this.handleChange} id="home" placeholder="Home"></input>

                      </div>
                    </div>
                    {/* <div className="row mt-2 mb-2">
                        <div className="col-md-6">
                        <h5 className="text-left">Reset Password</h5>
                        </div>
                    </div> */}
                    {/* <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label id="label">Old Password</label>
                          <input type="oldpassword" className="form-control" id="oldStudentPassword" placeholder="Old Password"></input>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label id="label">New Password</label>
                          <input type="newpassword" className="form-control" id="newStudentPassword" placeholder="Password"></input>
                        </div>
                      </div> */}
                      {/* <div className="col-md-6">
                        <div className="form-group">
                          <label id="label">Confirm New Password</label>
                          <input type="confpassword" className="form-control" id="newStudentPasswordConf" placeholder="Confirm Password"></input>
                        </div>
                      </div>
                    </div> */}

                    <div className="row">
                      <div className="col-md-3 mt-3 ml-auto">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={this.updateStudent} >Update Profile</button>
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

  getStudentDetails(){
    Axios.get(`http://localhost:9000/student/get/${localStorage.getItem('email')}`)
      .then(function (response) {
        // handle success
        console.log(response);
        this.setState(
          {userData:response.data}
        )
      }.bind(this))
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

clear(){
  this.setState(
    {userData:{}}
  )
}

  updateStudent() {

    var studentName = this.state.userData.studentName;
    var itNo = this.state.userData.itNo;
    var address = this.state.userData.address;
    var mobileNo = this.state.userData.mobileNo;
    var homeNo = this.state.userData.homeNo;

  
    // var studentPassOld=document.getElementById("oldStudentPassword").value;
    // var studentPass = document.getElementById("newStudentPassword").value;
    // var studentPassConf = document.getElementById("newStudentPassword").value;

    if (itNo === ""||itNo.length!==10) {
      alert("Invalid IT number");
    }else if (studentName === "") {
      alert("Invalid student name");
    } else if (address === "") {
      alert("Invalid address details");
    } else if (mobileNo==""||mobileNo.length !==10) {
      alert("Invalid MobileNo");
    }else if (homeNo==""||homeNo.length !==10) {
      alert("Invalid MobileNo");
    }
    // else if(this.state.userData.){
    //   alert("Password you entered doesnt match with the old one.Try again");
    // }
    //  else if (studentPass !== studentPassConf) {
    //   alert("Password entered doesn't match");
    // } else if (homeNo == "") {
    //   alert("Invalid Home TelephoneNo");
    // } 
    else {

      // let student = {
      //   id:this.
      //   itNo: itNo,
      //   studentName: studentName,
      //   address: address,
      //   mobileNo: mobileNo,
      //   homeNo: homeNo
      // };

      let student=this.state.userData;
      // console.log(student);  
      fetch('http://localhost:9000/student/update', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      }).then(function (data) {
        alert("Updated Successfully");
        this.clear();
      }.bind(this));
      
      // .then(function (data) {
      //   console.log("return2", data);
      //   var id = (data.id);
      //   var objUser = {
      //     id: id,
      //     // email: email,
      //     password: studentPass,
      //     type: "student"
      //   };
      //   return fetch('http://localhost:9000/user/addUser', {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json, text/plain',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(objUser)
      //   }).then(function () {
      //     alert("Student Registration Succesfull");
      //     window.location.reload();
      //   });

      // }

      // )
    }
  }

}

export default ContentTwo;