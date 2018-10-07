import React, {Component} from 'react';

class SidePanel extends Component {

  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="col-sm-2 p-0">
          <div class="list-group " >
            <a href="#" class="list-group-item list-group-item-action text-left" onClick={()=> this.props.setView("contentOne")}>Manage Supervisors</a>
            <a href="#" class="list-group-item list-group-item-action text-left" onClick={()=> this.props.setView("contentThree")}>Update Company Details</a>
          </div>
      </div>
    );
  }
}

export default SidePanel;