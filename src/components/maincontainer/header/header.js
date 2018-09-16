import React, { Component } from 'react';
import "./header.css";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let logoutbutton;

    if(this.props.loadedBody==="login"){
      logoutbutton = "";
    }
    else if(this.props.loadedBody==="registration"){
      logoutbutton = (
        <button type="button" class="btn btn-outline-success" onClick={this.props.logout}>Login</button>
      );
    }
    else{
      logoutbutton = (
        <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModalCenter">Logout</button>
      );
    }
    

    return (
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
        <a class="navbar-brand" href="#" id="headertext">Industrial Training Dashboard</a>
        {logoutbutton}
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Logout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.props.logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>


      </nav>


    );
  }
}

export default Header;
