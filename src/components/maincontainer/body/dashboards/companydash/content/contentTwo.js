import React, {Component} from 'react';
import './content.css';
import Axios from 'axios';
import SupervisorTable from './supervisorTable';

class ContentTwo extends Component {

  constructor(props){
    super(props);
    this.setCompany = this.setCompany.bind(this);
    this.state = {
      loggeduser : null,
      companydetails : null,
      companyName : null,
      supervisors : null
    }
  }

  componentWillMount(){
    this.setLoggedUser(this.props.loggeduser);
    console.log(this.props.loggeduser);
  }

  componentDidMount(){
    this.setCompany();
  }

  setIsTableUpdated(){
    this.setState({istableupdated : !this.state.istableupdated});
  }

  setCompany(){
    Axios.get('http://localhost:9000/company/getcompany/'+this.state.loggeduser.id).then(function (data) {
        this.setState({companyName : data.data.cmpName});
        this.setState({companydetails : data.data});
        console.log(this.state.companydetails);
    }.bind(this));
  }

  setLoggedUser(e) {
    console.log(e);
    this.setState({ loggeduser: e });
  }

  render(){
    return(
      <div className="content">
        <div className="card content">
            <div className="card-header bg-secondary">
              Supervisors : {this.state.companyName}
            </div>
            <div className="card-body" id="formContainer">
                <div class="table-responsive">
                  <SupervisorTable currentCompany={this.state.loggeduser.id}/>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default ContentTwo;