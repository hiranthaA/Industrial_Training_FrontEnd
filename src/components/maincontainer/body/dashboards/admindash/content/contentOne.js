import React, {Component} from 'react';
import './content.css';

class ContentOne extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="content">
        this is ContentOne admin
      </div>
    );
  }
}

export default ContentOne;