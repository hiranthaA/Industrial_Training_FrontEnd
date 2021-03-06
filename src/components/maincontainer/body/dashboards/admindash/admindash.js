import React, {Component} from 'react';
import SidePanel from './sidepanel/sidepanel'
import ContentOne from './content/contentOne';
import ContentTwo from './content/contentTwo';
import ContentThree from './content/contentThree';
import './admindash.css';

class AdminDash extends Component {

  constructor(props){
    super(props);

    this.setView = this.setView.bind(this);

    this.state={
      view : "contentOne"
    }
  }

  setView(x){
    this.setState({view:x});
  }

  render(){
    let content;

    if(this.state.view==="contentOne"){
      content = (
        <ContentOne/>
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
      <div className="admindash">
          <SidePanel setView={this.setView} />
          {content}
      </div>
    );
  }
}

export default AdminDash;