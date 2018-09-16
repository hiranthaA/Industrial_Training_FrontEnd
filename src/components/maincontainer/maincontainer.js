import React, {Component} from 'react';
import Header from './header/header';
import Body from './body/body';

class MainContainer extends Component {

  constructor(props){
    super(props);
    this.childBody = React.createRef();
    this.setLoggedStatus=this.setLoggedStatus.bind(this);
    this.setLoadedBody = this.setLoadedBody.bind(this);
    this.state={
      loggedStatus : false,
      loadedBody : "login"
    }
  }

  setLoggedStatus(){
    this.setState({loggedStatus : !this.state.loggedStatus});
    console.log("main container loggedstatus method reached");
    console.log(this.state.loggedStatus);
    this.childBody.current.setLoadedBodyToLogin();
  }

  setLoadedBody(lb){
    this.setState({loadedBody : lb});
    console.log("this is MC setloadedBody fn : "+lb);
  }

  render(){

    return(
      <div>
        <Header logout={this.setLoggedStatus} loadedBody={this.state.loadedBody}/>
        <Body ref={this.childBody} setMCLoadedBody = {this.setLoadedBody}/>
      </div>
    );
  }
}

export default MainContainer;
