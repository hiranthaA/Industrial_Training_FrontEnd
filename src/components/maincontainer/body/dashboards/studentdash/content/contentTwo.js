import React, {Component} from 'react';
import './content.css';

class ContentTwo extends Component {
  constructor(props){
    super(props); 
    this.handleChange = this.handleChange.bind(this);  
    this.submitFrom = this.submitFrom.bind(this);
    this.state = {
      party:"",
      description:"",
      from:"",
      to:"",
      summary:"",
      details:"",

    }
  }
  submitFrom(e){

  }
  handleChange(e){
    var id = e.target.id;
    if(id==="trainingParty"){
      this.setState({party:e.target.value});
    }else if(id==="trainingDescription"){
      this.setState({description:e.target.value});
    }else if(id==="from"){
      this.setState({from:e.target.value});
    }else if(id==="to"){
      this.setState({to:e.target.value});
    }else if(id==="summary"){
      this.setState({summary:e.target.value});
    }else if(id==="details"){
      this.setState({details:e.target.value});
    }
  }
  render(){
    return(
      <div className="contentStudent">
          <div className="card">
          <div className="card-head bg-secondary text-white">
              <h4 className="heading pl-2">Form I-3</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <h5>Enter Internal Training Information</h5>
            </div>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <label className="labelStudent" htmlFor="trainingParty"><b>Training Party</b></label>
                
              </div>
              <div className="col-md-10 col-sm-10">
                <input type="text" className="i3Input" value={this.state.party} onChange={this.handleChange} id="trainingParty"></input>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <label  className="labelStudent" htmlFor="trainingDescription"><b>Training Description</b></label>
                
              </div>
              <div className="col-md-10 col-sm-10">
                <textarea className="i3Input" value={this.state.description} onChange={this.handleChange} id="trainingDescription" row={3} col={2}></textarea>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-1 col-sm-1">
                <label  className="labelStudent"><b>Period:</b></label>
                
              </div>
              <div className="col-md-11 col-sm-11">
                <div className="row">
                  <div className="col-md-1 col-sm-1">
                      <label className="labelStudent" htmlFor="from"><b>From</b></label>
                  </div>
                  <div className="col-md-11 col-sm-11">
                      <input type="date" value={this.state.from} onChange={this.handleChange} className="i3Input" id="from" placeholder="mm/dd/yyyy"></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1 col-sm-1">
                        <label className="labelStudent" htmlFor="to"><b>To</b></label>
                    </div>
                    <div className="col-md-11 col-sm-11">
                      <input type="date" value={this.state.to} onChange={this.handleChange} className="i3Input" id="to" placeholder="mm/dd/yyyy"></input>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="card-footer">
          
          </div>
          </div>
          <div className="card">
            <div className="card-head bg-warning">
              <h4>Summary of tasks on this month</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-2 col-sm-2" >
                    <label className="labelStudent" htmlFor="summary">Summary of key tasks</label>
                </div>
                <div className="col-md-10 col-sm-10" >
                    <textarea className="i3Input" value={this.state.summary} onChange={this.handleChange} placeholder="Enter your summary of key tasks completed in this month." id="summary"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 col-sm-2" >
                    <label className="labelStudent" htmlFor="details">Details of key tasks</label>
                </div>
                <div className="col-md-10 col-sm-10" >
                    <textarea className="i3Input" value={this.state.details} onChange={this.handleChange} placeholder="Enter your details of key tasks completed in this month." id="details"></textarea>
                </div>
              </div>
            
            <div className="card-footer">
                <button className="btn btn-primary i3Input" onClick={this.submitFrom} type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentTwo;