import React, { Component } from 'react';
import './content.css';
import axios                        from 'axios';
import jsPDF                        from 'jspdf';
import html2canvas                  from 'html2canvas';
import SelectView                   from './SelectView';
import {Table, Button}              from 'react-bootstrap'
class ContentOne extends Component {

    constructor(props){
        super(props);   
        this.state = {
            formID:"",
            date : new Date(),
            StudentID:"",
            StudentName:"",
            StudentAddress:"",
            StudentEmail:"",
            StudentCGPA:"",
            StudentHomeContact:"",
            StudentMobile:"",
            StudentYear:"",
            Semester:"",
            selectVisible:false,
            valid:false
        };
        this.setName = this.setName.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setCGPA = this.setCGPA.bind(this);
        this.setHomeContact = this.setHomeContact.bind(this);
        this.setStudentEmail = this.setStudentEmail.bind(this);
        this.setSemester = this.setSemester.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setStudentMobile = this.setStudentMobile.bind(this);
        this.setID = this.setID.bind(this);
        this.getStudentDetails = this.getStudentDetails.bind(this);


    }

   
    setName(e){
        this.setState({StudentName:e.target.value})
    }
    setID(e){
        this.setState({StudentId:e.target.value})
    }
    setAddress(e){
        this.setState({StudentAddress:e.target.value})
    }
    setHomeContact(e){
        this.setState({StudentHomeContact:e.target.value})
    }
    setStudentMobile(e){
        this.setState({StudentMobile:e.target.value})
    }
    setStudentEmail(e){
        this.setState({StudentEmail:e.target.value})
    }
    setYear(e){
        var valid =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(e.target.value)
        if(e.target.value.toString().length>1){
            e.target.value=e.target.value.toString().substr(1)[0];
                if(e.target.value>4){
                    e.target.value=4;
                }else if(e.target.value<=0){
                    e.target.value=1;
                }else if(valid){
                    e.target.value=0;
                }
            }
        this.setState({StudentYear:e.target.value})
    }
    setSemester(e){
        var valid =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,..<>\/?]+/.test(e.target.value)
      
        if(valid){
            e.target.value=e.target.value.toString().substr(e.target.value.toString().length-2)[0]
        }
        if(e.target.value.toString().length>1){
            e.target.value=e.target.value.toString().substr(1)[0];
            if(e.target.value>2){
                e.target.value=2;
            }else if(e.target.value<=0){
                e.target.value=1;
            }else if(!valid){
                e.target.value=1;
            }
        }
        this.setState({Semester:e.target.value})
    }
    setCGPA(e){
        if(e.target.value.toString().length>4){
            e.target.value=e.target.value.toString().substr(4)[0];

                if(parseFloat(e.target.value)>4){
                    e.target.value=4.2
                }else if(parseFloat(e.target.value)<0){
                    e.target.value=0;
                }
                // }else{
                // e.target.value = "";
                // }
            
        }else if(parseFloat(e.target.value.toString())>4.2&&e.target.value.toString().length>=2){
            if(/^[.]$/.test(e.target.value.toString())){}else{
                e.target.value=4.2
            }
        }
        this.setState({StudentCGPA:e.target.value})
    }
    componentWillMount(){

    }
    componentDidMount(){
   
        console.log(this.props);
        this.getStudentDetails();
    }


    getStudentDetails(){
        console.log(this.props);
        
        axios.get("http://localhost:9000/student/id/"+this.props.superProps.id).then(
            function(response){

                console.log(response.data);

                this.setState({

                    StudentID:response.data.itNo,
                    StudentName:response.data.studentName,
                    StudentAddress:response.data.address,
                    StudentEmail:response.data.email,
                    StudentCGPA:response.data.gpa,
                    StudentHomeContact:response.data.homeNo,
                    StudentMobile:response.data.mobileNo,
                    StudentYear:response.data.year,
                    Semester:response.data.semester
                });

            }.bind(this)
        ).catch(function (error) {
            console.log(error);
            alert("error");
        });


    }

    validate(a,type){
        var text = a;
        if(type==="text"){

            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
                return true;
            }


        }else if(type==="email"){

            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                //email validation
                
            }

        }else if(type==="phone"){

            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(text);
                
            }

        }else if(type==="itNo"){
            
            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\[Ii][Tt][0-9]{8}$/.test(text);
                
            }

        }else if(type==="nic"){
            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\[0-9]{9}[VvXx]$/.test(text);
                
            }
        }else if(type==="year"){
            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\[1234]$/.test(text);
                
            }
        }else if(type==="semester"){

            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\[12]$/.test(text);
                
            }

        }else if(type==="gpa"){

            if(text===""){
                return false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                return false;
            } else {
    
                return /^\[1-4][.][0-99]$/.test(text);;
                
            }

        }
    }

    fillFormI1(e){

        this.setState({selectVisible:true});


        window.$("#addSupModal").modal("show");
        window.$("#addSupModal").show();
        window.$('.modal-backdrop').show();
        // window.$("body").addClass("modal-open");
       
        /**
         * After Submit Clicked
         * 
         * 
        axios.post("http://localhost:9000/forms/formi1",{
            // studentId:this.state.StudentID,
            // studentName:this.state.StudentName,
            // studentAddress:this.state.StudentAddress,
            // studentEmail:this.state.StudentEmail,
            // studentHomePhone:this.state.StudentHomeContact,
            // studentMobilePhone:this.state.StudentMobile,
            // semester:this.state.Semester,
            // year:this.state.StudentYear,
            // cgpa:this.state.StudentCGPA
            //
            studentId:document.getElementById('stdId').value,
            studentName:document.getElementById('stdName').value,
            studentAddress:document.getElementById('addr').value,
            studentEmail:document.getElementById('emailAddr').value,
            studentHomePhone:document.getElementById('hpho').value,
            studentMobilePhone:document.getElementById('mpho').value,
            semester:document.getElementById('sem').value,
            year:document.getElementById('yr').value,
            cgpa:document.getElementById('cgpa').value,
            status:"PARTIAL"


        }).then(
            function(response){
                console.log(response);
                alert("Form created successfully");
            }
        ).catch(function (error) {
            console.log(error);
            alert("Error");
        });
         */
    }
    

    createFormI1(e){

        const input = document.getElementById('divToPrint');
        html2canvas(input).then(
            (canvas)=>{
                const imageData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imageData, "JPEG",5,30,200,100 );
                // pdf.output('dataurlnewwindow');
                pdf.save("Report.pdf");
            });


        e.preventDefault();

    }
    render(){
        let supervisorSelection;
        if(this.state.selectVisible!==false){
            supervisorSelection =(<SelectView loggeduser={this.props.superProps} student={this.state}/>);
        }
        return(
            <div className="contentStudent">
                <h1>Fill first part of Form I-1</h1>
                <div >
                    <hr/>
                    <span><h3>Create Form I-1: </h3></span>
                    <div id="divToPrint" >
                        <div className="card border-danger">
                            <div  className="card-header bg-primary text-white">
                                <h3>Internship Acceptance Form</h3>
                                <br/>
                            </div>
                            <div className="card-body">
                                <Table  striped  condensed responsive hover id="formI1Table">
                                    <thead>
                                    <tr>

                                    </tr>
                                    </thead>
                                    <tbody id="formI1Body">
                                        <tr>
                                            <td>Student ID:</td>
                                            <td colSpan='5'><input className='inputBlock' type="text" id ="stdId" name="StudentId" value={this.state.StudentID}  onChange={this.setID} /></td>
                                        </tr>
                                        <tr>
                                            <td>Student Name:</td>
                                            <td colSpan='5'><input className='inputBlock' type="text" id ="stdName" name="StudentName" value={this.state.StudentName} onChange={this.setName} /></td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td colSpan='5'><input className='inputBlock' type="text" id ="addr" name="StudentAddress" value={this.state.StudentAddress} onChange={this.setAddress}/></td>
                                        </tr>
                                        <tr>
                                            <td>Home Phone:</td>
                                            <td colSpan='5'><input className='inputBlock' type="text" id ="hpho" name="StudentHomeContact" value={this.state.StudentHomeContact} onChange={this.setHomeContact}/></td>
                                        </tr>
                                        <tr>
                                            <td>Mobile Phone:</td>
                                            <td colSpan='5'> <input className='inputBlock' type="text" id ="mpho" name="StudentMobile" value={this.state.StudentMobile} onChange={this.setStudentMobile}/> </td>
                                        </tr>
                                        <tr>
                                            <td>E-mail Addresses:</td>
                                            <td colSpan='5'><input className='inputBlock' type="text" id ="emailAddr" name="StudentEmail" value={this.state.StudentEmail} onChange={this.setStudentEmail}/></td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                                <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <label>Semester:</label>
                                                            </div>
                                                            <div className="col-md-6 col-sm-6">
                                                                <input className='inputBlock'  type="number" min='1' max='2' id ="sem" name="Semester" value={this.state.Semester} onChange={this.setSemester}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <label>Year:</label>
                                                            </div>
                                                            <div className="col-md-6 col-sm-6">
                                                                <input className='inputBlock'  type="number" min='1' max='4' id ="yr" name="Year" value={this.state.StudentYear} onChange={this.setYear}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <label>CGPA:</label>
                                                            </div>
                                                            <div className="col-md-6 col-sm-6">
                                                                <input className='inputBlock'  type="text" id ="cgpa" name="StudentCGPA" value={this.state.StudentCGPA} onChange={this.setCGPA}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                            </div>

                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col">
                            <Button  value="Create I-1 Form PDF" bsStyle="info"  bsSize="large"  onClick={this.createFormI1.bind(this)} block>PDF</Button>
                        </div>
                        <div className="col-md-6 col">
                            <Button  value="Fill I-1 Form" bsStyle="success"  bsSize="large"  onClick={this.fillFormI1.bind(this)} block>Fill Form I-1</Button>
                        </div>
                    </div>
                    {supervisorSelection}
                </div>
            </div>
        );
    }
}

export default ContentOne;