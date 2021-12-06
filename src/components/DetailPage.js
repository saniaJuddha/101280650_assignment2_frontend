import React, { Component } from "react";
import axios from "axios";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
    };
  }
  componentDidMount() {
    this.getEmployee();
  }

  getEmployee() {
    const id = this.props.match.params.id;
    axios.get(`/api/v1/employees/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          employee: res.data.employee,
        });
        console.log("Employee: ", this.state.employee);
      }
    });
  }
  render() {
    const { firstName, lastName, emailId } = this.state.employee;
    return (
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{emailId}</td>
            </tr>
        </tbody>
        </table>
      </div>
    );
  }
}

export default DetailPage;