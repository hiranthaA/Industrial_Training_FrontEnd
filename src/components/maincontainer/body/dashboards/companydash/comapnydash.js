import React, {Component} from 'react';
import SidePanel from './sidepanel/sidepanel'
import ContentOne from './content/contentOne';
import ContentTwo from './content/contentTwo';
import ContentThree from './content/contentThree';
import './companydash.css';

class CompanyDash extends Component {

  constructor(props){
    super(props);

    this.setView = this.setView.bind(this);

    this.state={
      view : "contentOne"
    }
  }

  componentDidMount(){
    console.log(this.props.loggeduser);
  }

  setView(x){
    this.setState({view:x});
  }

  render(){
    let content;

    if(this.state.view==="contentOne"){
      content = (
        <ContentOne loggeduser={this.props.loggeduser}/>
      );
    }
    else if(this.state.view==="contentTwo"){
      content = (
        <ContentTwo/>
      );
    }
    else if(this.state.view==="contentThree"){
      content = (
        <ContentThree/>
      );
    }

    return(
      <div className="compdash">
          <SidePanel setView={this.setView} />
          {content}
      </div>
    );
  }
}

export default CompanyDash;
