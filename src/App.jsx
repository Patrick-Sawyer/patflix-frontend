import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signin from "./components/Signin/Signin";
import Upload from "./components/Upload/Upload";
import MyVids from "./components/MyVids/MyVids";
import Friends from "./components/Friends/Friends";
import Signup from "./components/Signup/Signup";
import Browse from "./components/Browse/Browse";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      user: {},
    };
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: true,
      user: data.user,
    });
  };

  checkLoginStatus = () => {
    console.log("called");
    axios
      .get("http://localhost:3001/login", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.logged_in === true) {
          this.setState({
            loggedInStatus: true,
            user: response.data.user,
          });
        } else {
          this.setState({
            loggedInStatus: false,
            user: {},
          });
        }
      });
  };

  handleLogout = () => {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.logged_in) {
          this.setState({
            loggedInStatus: false,
            user: {},
          });
        }
      });
  };

  componentDidMount = () => {
    this.checkLoginStatus();
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar
            loggedInStatus={this.state.loggedInStatus}
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route
              exact
              path={"/signup"}
              render={(props) => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Browse {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path={"/signin"}
              render={(props) => (
                <Signin
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            {this.state.loggedInStatus && (
              <Route exact path={"/myvids"} component={MyVids} />
            )}
            {this.state.loggedInStatus && (
              <Route exact path={"/upload"} component={Upload} />
            )}
            {this.state.loggedInStatus && (
              <Route exact path={"/friends"} component={Friends} />
            )}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
