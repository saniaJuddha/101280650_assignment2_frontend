import React, { Component } from "react";
import Axios from "axios";
import { setErrors } from "../common/setErrors";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      errors: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    Axios.get(`/api/v1/employees/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          firstName: res.data.employee.firstName,
          lastName: res.data.employee.lastName,
          emailId: res.data.employee.emailId,
        });
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  validate = (firstName, lastName, emailId) => {
    const errors = setErrors(firstName, lastName, emailId);
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { firstName, lastName, emailId} = this.state;
    if (this.validate( firstName, lastName, emailId)) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
      };
      console.log(data);
      Axios.put(`/api/v1/employees/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Edited successfully");
        }
      });
    }
  };

  render() {
    return (
      <div className="col-md-10 mt-3 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit Employee</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" name="firstName" placeholder="Enter First Name" value={this.state.firstName} onChange={this.handleInputChange}/>
            {this.state.errors.firstName && (
              <div className="text-danger">{this.state.errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" name="lastName" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.handleInputChange}/>
            {this.state.errors.lastName && (
              <div className="text-danger">{this.state.errors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input type="text" className="form-control" name="emailId" placeholder="Enter Email ID" value={this.state.emailId} onChange={this.handleInputChange}/>
            
            {this.state.errors.emailId && (
              <div className="text-danger">{this.state.errors.emailId}</div>
            )}
          </div>

          <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
          
        </form>
      </div>
    );
  }
}


export default EditPage;