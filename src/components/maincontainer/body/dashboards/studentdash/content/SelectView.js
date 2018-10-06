import React, {Component}   from 'react';
import axios                from 'axios';
import {Table, Button}      from 'react-bootstrap'
import                      './content.css';

class SelectView extends Component {

    constructor(props){
        super(props);
        this.fillFormI1 = this.fillFormI1.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.fillFormI3 = this.fillFormI3.bind(this);
        this.state = {
            formID:null,
            date : new Date(),
            student:this.props.student

        }
        
    }

    validateForm(e){
        var valid = false;
        if(this.validation(this.state.student.StudentName,"text")&&this.validation(this.state.student.StudentAddress,"text")&&this.validation(this.state.student.StudentEmail,"email")&&
                               this.validation(this.state.student.StudentID,"itNo")&&this.validation(this.state.student.StudentHomeContact,"mobile")&&this.validation(this.state.student.StudentMobile,"mobile") )
            {
                this.setState({valid:true});
                valid=true;
            }
        return valid;
    }
    validation(text,type){

        var valid = false;
        if(type==="text"){
            if(text===""){
                valid =  false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/;

            if(format.test(text)){
                valid =  false;
            } else {
                valid =  true;
            }
            
        }else if(type==="mobile"){
            
            if(text===""){
                valid =  false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            if(format.test(text)){
                valid =  false;
            } else {

                valid  = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(text);
                
            }
            if(!valid){
                alert("Entered Contact number not valid");
            }
        }else if(type==="email"){
            if(text===""){
                valid  = false;
            }
            var format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

            if(format.test(text)){
                valid  = false;
            } else {

                valid  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(text);
                
            }
            if(!valid){
                alert("Entered email not valid");
            }
        }else if(type==="itNo"){
            if(text===""){
                valid  = false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            if(format.test(text)){
                valid  = false;
            } else {

                valid  = /^[IiBbEe][TtMmNn][0-9]{8}$/.test(text);
                
            }
            if(!valid){
                alert("Entered IT number not valid");
            }
        }else if(type==="nic"){
            
            if(text===""){
                valid =  false;
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
            if(format.test(text)){
                valid =  false;
            } else {
                // if(this.state.selectedOption==="nic")
                    valid =  /^[0-9]{9}[XxVv]{1}$/.test(text);
                // else
                //     return /[a-zA-Z]{2}[0-9]{7}/.test(nicorpass);
                
            }
            if(!valid){
                alert("Entered NIC not valid");
            }
        }
        return valid;
    }
    componentWillMount(){

    }
    componentDidMount(){
        
        console.log(this.props);
        window.$('#addSupModal').modal('show');
        window.$('#addSupModal').style="padding-right:0px"
        this.getSupervisorTable();

    }
    getSupervisorTable(){
        var supervisorTable = document.getElementById("supervisorTable");
        var supervisorTableBody = document.getElementById("supervisorTableBody");
        axios.get("http://localhost:9000/supervisor/getall").then(
            
            (res)=>{
                console.log(res);
                res.data.forEach(element => {
                    var company;
                    axios.get("http://localhost:9000/company/getcompany/"+element.companyid).then(
                        (com)=>{
                            company=com.data['cmpName'];
                            var row = supervisorTableBody.insertRow();
                            var cell1 = row.insertCell();
                            var cell2 = row.insertCell();
                            var cell3 = row.insertCell();
                            var cell4 = row.insertCell();
                            var cell5 = row.insertCell();
                            var cell6 = row.insertCell();

                            cell1.innerHTML=element["title"]+" "+element["fname"]+" "+element["lname"];
                            cell2.innerHTML=company;
                            cell3.innerHTML=element["designation"];
                            cell4.innerHTML=element["email"];
                            cell5.innerHTML=element["contact"];
                            cell6.innerHTML="<input type='radio' name='Supervisor' value='"+element["email"]+"' id='"+element["id"]+"' />"
                        }
                    )

                });
            }

        )
       
        
    }

    fillFormI3(e){
        var party = this.state.student.party;
        var description = this.state.student.description;
        var from = this.state.student.from;
        var to = this.state.student.to;
        var summary = this.state.student.summary;
        var details = this.state.student.details;

        var StudentEmail ;
        var StudentCGPA ;
        var StudentId;
        
        var supervisors = document.getElementsByName("Supervisor");
                var selectedSupervisor;

                for(var i = 0; i < supervisors.length; i++) {
                if(supervisors[i].checked)
                        selectedSupervisor = supervisors[i].id;
                }
        axios.get("http://localhost:9000/student/id/"+this.props.loggeduser.id).then(
            function(response){

                console.log(response.data);
                StudentId=response.data.itNo;
                StudentEmail=response.data.email;
                StudentCGPA=response.data.gpa;
                
                axios.get("http://localhost:9000/supervisor/getsupervisor/"+selectedSupervisor).then(
                (res)=>{
                    console.log("Supervisor: "+res);
                    axios.get("http://localhost:9000/company/getcompany/"+res.data["companyid"]).then(
                        (com)=>{

                            console.log("Company :"+com);
                            axios.post("http://localhost:9000/forms/formi3",{
                
                                studentId:StudentId,
                                studentEmail:StudentEmail,
                                trainingParty:party,
                                description:description,
                                from:from,
                                to:to,
                                summary:summary,
                                details:details,
                                supervisorEmail:res.data.email,
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
                );
                    
                }
                
            )
            



            }.bind(this)
        ).catch(function (error) {
            console.log(error);
            alert("error");
        });


        this.CloseModal();
        e.preventDefault();
    }

    fillFormI1(e){
        var StudentId = this.state.student.StudentID;
        var StudentName = this.state.student.StudentName;
        var StudentAddress = this.state.student.StudentAddress;
        var StudentEmail = this.state.student.StudentEmail;
        var StudentCGPA = this.state.student.StudentCGPA;
        var StudentHomeContact = this.state.student.StudentHomeContact;
        var StudentMobile = this.state.student.StudentMobile;
        var StudentYear = this.state.student.StudentYear;
        var Semester = this.state.student.Semester;


        var supervisors = document.getElementsByName("Supervisor");
        var selectedSupervisor;

        for(var i = 0; i < supervisors.length; i++) {
        if(supervisors[i].checked)
                selectedSupervisor = supervisors[i].id;
        }



        if(this.validateForm()){
            axios.get("http://localhost:9000/supervisor/getsupervisor/"+selectedSupervisor).then(
                (res)=>{
                    console.log("Supervisor: "+res);
                    axios.get("http://localhost:9000/company/getcompany/"+res.data["companyid"]).then(
                        (com)=>{

                            console.log("Company :"+com);
                            axios.post("http://localhost:9000/forms/formi1",{
                
                                studentId:StudentId,
                                studentName:StudentName,
                                studentAddress:StudentAddress,
                                studentEmail:StudentEmail,
                                studentHomePhone:StudentHomeContact,
                                studentMobilePhone:StudentMobile,
                                semester:Semester,
                                year:StudentYear,
                                cgpa:StudentCGPA,
                                // supervisorName:res.data.fname+" "+res.data.lname,
                                // supervisorTitle:res.data.title,
                                // supervisorDesignation:res.data.designation,
                                // supervisorPhone:res.data.contact,
                                supervisorEmail:res.data.email,
                                // companyName:com.data.cmpName,
                                // companyAddres:com.data.address,
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
                );
                    
                }
                
            )
        }else{
            alert("Please enter correct details in previous step.");
        }
        
            
            window.$('#addSupModal').hide();
            window.$('body').removeClass('modal-open');
            window.$('.modal-backdrop').remove();
            e.preventDefault();
        
    }
    CloseModal(){
            window.$('#addSupModal').hide();
            window.$('body').removeClass('modal-open');
            window.$('.modal-backdrop').remove();
           
    }
    render(){
        let submit;

        if(this.props.student.supervisorSelect===true){
            submit = (<Button bsStyle="success"  data-dismiss="modal" id = "formI3Submit" bsSize="large" onClick={this.fillFormI3} block>Submit</Button>)
            
        }else if(this.props.student.selectVisible===true){
            submit=(<Button bsStyle="success"  data-dismiss="modal" id = "formI1Submit" bsSize="large" onClick={this.fillFormI1} block>Submit</Button>)
        }
        return(
        <div className="content-student">
            <div className="modal fade bd-example-modal-lg supervisorView" id="addSupModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-Student">
                    <div className="modal-content">
                        <div className="card border-secondary ">
                            <div className="card-header modal-header bg-info text-white">
                                <h4 className="headingStudent pl-2">Select An Supervisor</h4>
                            </div>
                            <div className="card-body modal-body">
                                <form>
                                    <div className="form-group row rowStudent">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="row rowStudent">
                                                <Table  striped responsive condensed  hover id="supervisorTable">
                                                    
                                                    
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Company</th>
                                                                <th>Designation</th>
                                                                <th>Email</th>            
                                                                <th>Contact</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                    <tbody id="supervisorTableBody">
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer modal-footer">
                                <form>
                                    <div className="form-group row rowStudent">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="row rowStudent" >
                                                <div className="col-md-6 col-sm-6">
                                                    {submit}
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <Button bsStyle="danger"  data-dismiss="modal" bsSize="large" onClick={this.CloseModal} block>Close</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    }

export default SelectView;