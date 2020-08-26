import React, { Component } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { loggedInStatus: this.props.loggedInStatus };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedInStatus !== prevState.loggedInStatus) {
      return { loggedInStatus: nextProps.loggedInStatus };
    } else return null;
  }

  navbarElements = () => {
    if (this.state.loggedInStatus === true) {
      return (
        <div>
          <li className="nav-item">
            <Link to="/">Browse</Link>
          </li>
          <li className="nav-item">
            <Link to="/myvids">My Vids</Link>
          </li>
          <li className="nav-item">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="nav-item">
            <Link to="/friends">Friends</Link>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={this.props.handleLogout}>
              Logout
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li className="nav-item">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin">Sign In</Link>
          </li>
        </div>
      );
    }
  };
  render() {
    return (
      <nav className="nav navbar">
        <a className="navbar-brand" href="/">
          Patflix
        </a>
        <div>
          <ul className="navbar-nav mr-auto">{this.navbarElements()}</ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
