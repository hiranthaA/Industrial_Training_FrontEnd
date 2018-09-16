import React, { Component } from 'react';
import Axios from 'axios';

class SupervisorTable extends Component {
    constructor(props) {
        super(props);
        this.getSupervisorList = this.getSupervisorList.bind(this);
        this.state = {
            supervisorList: []
        }
    }

    componentWillMount() {
        this.getSupervisorList();
    }

    getSupervisorList() {
        Axios.get('http://localhost:9000/supervisor/getsupervisors/' + this.props.currentCompany).then(function (supvsr) {
            console.log(supvsr.data);
            this.setState({ supervisorList: supvsr.data });
            return supvsr.data;
        }.bind(this)).then(function (data) {
            console.log(data);
        }.bind(this));
    }

    render() {

        let table;

        if (this.state.supervisorList.length !== 0) {
            console.log("data available");
            console.log(this.state.supervisorList.length);
            table = (
                <table className="table table-hover table-active">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.supervisorList.map((supvsr, i) => {
                            return (
                                <tr key={i}>
                                    <td>{supvsr.title+" "+supvsr.fname+" "+supvsr.lname}</td>
                                    <td>{supvsr.designation}</td>
                                    <td>{supvsr.contact}</td>
                                    <td>{supvsr.email}</td>
                                    <td><button type="button" className="btn btn-outline-info" id={supvsr.id}>Edit</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
        else {
            table = "No Supervisors Available";
        }

        return (
            <div>
                {table}
            </div>
        );
    }
}

export default SupervisorTable;