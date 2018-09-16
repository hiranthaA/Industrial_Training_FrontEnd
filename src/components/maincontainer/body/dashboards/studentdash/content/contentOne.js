import React, { Component } from 'react';
import './content.css';
import axios                        from 'axios';
import jsPDF                        from 'jspdf';
import html2canvas                  from 'html2canvas';
import {Table, Button}              from 'react-bootstrap'
class ContentOne extends Component {

    constructor(props){
        super(props);
        this.setName = this.setName.bind(this);
        this.state = {
            formID:null,
            date : new Date(),
            StudentID:null,
            StudentName:null,
            StudentAddress:null,
            StudentEmail:null,
            StudentCGPA:null,
            StudentHomeContact:null,
            StudentMobile:null,
            StudentYear:null,
            Semester:null
        }
        this.getStudentDetails();
    }
    componentWillMount(){

    }
    componentDidMount(){
        // debugger;
        console.log(this.props);
        this.getStudentDetails();
    }


    getStudentDetails(){
        axios.get("http://localhost:9000/forms/formi1/studentEmail/geeth@gmail.com").then(
            function(response){
                // debugger;
                console.log(response.data);

                this.setState({
                    formID:response.data.formid,
                    StudentID:response.data.studentId,
                    StudentName:response.data.studentName,
                    StudentAddress:response.data.studentAddress,
                    StudentEmail:response.data.studentEmail,
                    StudentCGPA:response.data.cgpa,
                    StudentHomeContact:response.data.studentHomePhone,
                    StudentMobile:response.data.studentMobilePhone,
                    StudentYear:response.data.year,
                    Semester:response.data.semester
                });

            }.bind(this)
        ).catch(function (error) {
            console.log(error);
            alert("error");
        });


    }
    updateFormI1(e){


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

    }
    setName(e){
        this.setState({StudentName:e.target.value})
    }




    createFormI1(e){

        const input = document.getElementById('divToPrint');
        html2canvas(input).then(
            (canvas)=>{
                const imageData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imageData, "JPEG",5,30,200,60 );
                // pdf.output('dataurlnewwindow');
                pdf.save("Report.pdf");
            });


        e.preventDefault();

    }
    render(){
        return(
            <div className="content">
                <h1>Fill first part of Form I-1</h1>
                <div >
                    <hr/>
                    <span><h3>Create Form I-1: </h3></span>
                    <div id="divToPrint" >
                        <h3>Internship Acceptance Form</h3>
                        <br/>

                        <Table  striped  condensed  hover id="formI1Table">
                            <thead>
                            <tr>

                            </tr>
                            </thead>
                            <tbody id="formI1Body">
                            <tr>
                                <td>Student ID:</td>
                                <td colSpan='5'><input className='inputBlock' type="text" id ="stdId" name="StudentId" value={this.state.StudentID}  /></td>
                            </tr>
                            <tr>
                                <td>Student Name:</td>
                                <td colSpan='5'><input className='inputBlock' type="text" id ="stdName" name="StudentName" value={this.state.StudentName} onChange={this.setName}/></td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td colSpan='5'><input className='inputBlock' type="text" id ="addr" name="StudentAddress" value={this.state.StudentAddress}/></td>
                            </tr>
                            <tr>
                                <td>Home Phone:</td>
                                <td colSpan='5'><input className='inputBlock' type="text" id ="hpho" name="StudentHomeContact" value={this.state.StudentHomeContact}/></td>
                            </tr>
                            <tr>
                                <td>Mobile Phone:</td>
                                <td colSpan='5'> <input className='inputBlock' type="text" id ="mpho" name="StudentMobile" value={this.state.StudentMobile}/> </td>
                            </tr>
                            <tr>
                                <td>E-mail Addresses:</td>
                                <td colSpan='5'><input className='inputBlock' type="text" id ="emailAddr" name="StudentEmail" value={this.state.StudentEmail}/></td>
                            </tr>
                            <tr>
                                <td>Semester:</td>
                                <td><input className='inputBlock' type="text" id ="sem" name="Semester" value={this.state.Semester}/></td>
                                <td>Year:</td>
                                <td><input className='inputBlock' type="text" id ="yr" name="Year" value={this.state.StudentYear}/></td>
                                <td>CGPA:</td>
                                <td><input className='inputBlock' type="text" id ="cgpa" name="StudentCGPA" value={this.state.StudentCGPA}/></td>

                            </tr>
                            </tbody>
                        </Table>


                        <hr/>
                    </div>
                    <Button  value="Create I-1 Form" onClick={this.createFormI1.bind(this)}>Create</Button>
                    <Button  value="Update I-1 Form" onClick={this.updateFormI1.bind(this)}>Add</Button>
                </div>
            </div>
        );
    }
}

export default ContentOne;