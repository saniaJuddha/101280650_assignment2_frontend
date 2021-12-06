import React, { Component } from "react";
import axios from "axios";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }
  
  componentDidMount() {
    this.getEmployees();
  }

  getEmployees() {
    axios.get("/api/v1/employees").then((res) => {
      if (res.data.success) {
        this.setState({
          employees: res.data.employees,
        });
        console.log("Employees: ", this.state.employees);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/api/v1/employees/${id}`).then((res) => {
      alert("Deleted successfully");
      this.getEmployees();
    });
  };

  render() {
    return (<div>
      &nbsp;&nbsp;&nbsp;
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map((emp, index) => (
            <tr>
              <th scope="row">{index}</th>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.emailId}</td>
              <td>
                <a className="btn btn-outline-primary" href={`/api/v1/employees/${emp._id}`}>
                  <i></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-outline-danger" href="#" onClick={() => this.onDelete(emp._id)}>
                  <i></i>&nbsp;Delete
                </a>
                &nbsp;
              <a className="btn btn-outline-success" href={`/api/v1/employees/${emp._id}`}>
                  <i></i>&nbsp;View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/api/v1/employees" className="btn btn-primary btn-lg">Add New Employee</a>
    </div>
    );
  }
}

export default LandingPage;