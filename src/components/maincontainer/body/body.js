import React, {Component} from 'react';
import Login from './login/login';
import CompanyDash from './dashboards/companydash/comapnydash';
import AdminDash from './dashboards/admindash/admindash';
import StudentDash from './dashboards/studentdash/studentdash';
import Registration from './registration/registration';
import SupervisorDash from './dashboards/supervisordash/supervisordash';


class Body extends Component {

  constructor(props){
    super(props);

    this.setLoadedBody = this.setLoadedBody.bind(this);

    this.state={
      loaded_body : "login",
      loggeduser:null
    }
  }

  setLoadedBodyToLogin(){
    this.setState({loaded_body : "login"});
  }

  setLoadedBody(x,y){
    this.setState({loggeduser:y});
    this.setState({loaded_body:x});
    this.props.setMCLoadedBody(x);
  }

  render(){

    let body;

    if(this.state.loaded_body==="login"){
      body=(
        < Login setview={this.setLoadedBody}/>
      );
    }
    else if(this.state.loaded_body==="company"){
      body=(
        < CompanyDash loggeduser={this.state.loggeduser}/>
      );
    }
    else if(this.state.loaded_body==="admin"){
      body=(
        < AdminDash loggeduser={this.state.loggeduser}/>
      );
    }
    else if(this.state.loaded_body==="student"){
      body=(
        < StudentDash loggeduser={this.state.loggeduser}/>
      );
    }
    else if(this.state.loaded_body==="registration"){
      body=(
        < Registration setview={this.setLoadedBody}/>
      );
    }
    else if(this.state.loaded_body==="supervisor"){
      console.log(this.state.loggeduser);
      body=(
        < SupervisorDash loggeduser={this.state.loggeduser}/>
      );
    }

    return(
      <div>
          {body}
      </div>
    );
  }
}

export default Body;
