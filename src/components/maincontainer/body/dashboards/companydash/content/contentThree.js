import React, {Component} from 'react';
import './content.css';

class ContentThree extends Component {

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            company: [],
            error: null,
            objId : null,
            loggeduser : null
        }
    }

    update(){
        var cmpname = document.getElementById("companyName").value;
        var address = document.getElementById("companyAddress").value;
        var tele = document.getElementById("companyTelephone1").value;
        var tele2 = document.getElementById("companyTelephone2").value;
        var fx1 = document.getElementById("companyFax1").value;
        var fx2 = document.getElementById("companyFax2").value;
        var id = this.props.loggeduser.id;
        var email = this.props.loggeduser.email;

        if (cmpname === "") {
            alert("Fill the name");
        } else if (address === "") {
            alert("Fill the address");
        } else if (tele === "") {
            alert("Fill the telephone");
        }else if (tele.length !== 10) {
            alert("Invalid telephone number");
        }
        else {
            var obj = {
                email: email,
                cmpId: id,
                cmpName: cmpname,
                address: address,
                contact: tele,
                contact2: tele2,
                fax1 : fx1,
                fax2 : fx2

            };

            fetch('http://localhost:9000/company/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(function () {
                alert("Company Details Updated Succesfully!");
            });

        }

    }

    componentDidMount() {

        console.log("logged is "+this.props.loggeduser.email);
        var email = this.props.loggeduser.email;

        fetch("http://localhost:9000/company/get/"+email)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("results are "+result);
                    this.setState({
                        company: result,
                        objId: result.id
                    });
                    document.getElementById("companyName").value=result.cmpName;
                    document.getElementById("companyEmail").value=result.email;
                    document.getElementById("companyAddress").value=result.address;
                    document.getElementById("companyTelephone1").value=result.contact;
                    document.getElementById("companyTelephone2").value=result.contact2;
                    document.getElementById("companyFax1").value=result.fax1;
                    document.getElementById("companyFax2").value=result.fax2;

                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )

    }

  render(){
    return(
      <div className="content">
          <div className="content card ">
              <div className="card body">
                  <div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                          <div className="content card ">

                              <div className="card-header">
                                  <h4 className="heading "><i class="fas fa-user-plus"></i> Company Details</h4>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <div className="col-sm-6 col-md-6">

                                          <div className="row">
                                              <div className="col-sm-6 col-md-6">
                                                  <div className="form-group">
                                                      <label id="label" >Company Name</label>
                                                      <input type="text" className="form-control" value="" id="companyName" placeholder="Company Name"></input>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row">
                                              <div className="col-md-12">
                                                  <div className="form-group">
                                                      <label id="label">Company Email</label>
                                                      <input type="email" className="form-control" id="companyEmail" placeholder="Company Email"  readOnly></input>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row">
                                              <div className="col-md-12">
                                                  <div className="form-group">
                                                      <label id="label">Address</label>
                                                      <input type="text" className="form-control" id="companyAddress" placeholder="Address"></input>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group">
                                                      <label id="label">Telephone 1</label>
                                                      <input type="number" className="form-control" id="companyTelephone1" placeholder="Telephone 1"></input>
                                                  </div>
                                              </div>

                                              <div className="col-md-6">
                                                  <div className="form-group">
                                                      <label id="label">Telephone 2</label>
                                                      <input type="number" className="form-control" id="companyTelephone2" placeholder="Telephone 2"></input>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group">
                                                      <label id="label">Fax 1</label>
                                                      <input type="number" className="form-control" id="companyFax1" placeholder="Fax 1"></input>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group">
                                                      <label id="label">Fax 2</label>
                                                      <input type="number" className="form-control" id="companyFax2" placeholder="Fax 2"></input>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row">
                                              <div className="col-md-4  ml-auto">
                                                  <button type="button" class="btn btn-outline-primary btn-block" onClick={this.update} >Update</button>
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
      </div>
    );
  }
}

export default ContentThree;