import React, {Component} from 'react';

class SidePanel extends Component {

  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="col-sm-2 p-0">
          <div class="list-group " >
            <a href="#" class="list-group-item list-group-item-action" onClick={()=> this.props.setView("contentOne")}>First item</a>
            <a href="#" class="list-group-item list-group-item-action" onClick={()=> this.props.setView("contentTwo")}>Second item</a>
            <a href="#" class="list-group-item list-group-item-action" onClick={()=> this.props.setView("contentThree")}>Third item</a>
          </div>
      </div>
    );
  }
}

export default SidePanel;