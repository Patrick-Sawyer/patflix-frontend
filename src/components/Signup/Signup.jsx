import React, { Component } from "react";
import "./Signup.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleLogin(response.data);
          this.props.history.push("/browse");
        } else {
          //error handling
        }
      })
      .catch((error) => {
        console.log(error);
        //error handling
      });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              className="form-control"
              autoFocus="autofocus"
              type="text"
              placeholder="Username"
              autofill="none"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              autofill="none"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm password"
              autofill="none"
              name="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-lg custom-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
