import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar as RsNavBar } from "reactstrap";
export default class NavBar extends Component {
  logOut() {
    localStorage.removeItem("DevLogToken");
    sessionStorage.removeItem("currentUser");
  }
  render() {
    if (sessionStorage.getItem("currentUser") !== null) {
      return (
        <RsNavBar>
          <Link to="/Topics">Topics</Link>
          <Link to="/ResourceTypes">Resources</Link>
          <label>Welcome {sessionStorage.getItem("currentUser")}</label>
          <Link to="/Login" onClick={this.logOut}>
            Log Out
          </Link>
        </RsNavBar>
      );
    }
    return (
      <RsNavBar>
        <Link to="/Topics">Topics</Link>
        <Link to="/ResourceTypes">Resources</Link>
        <Link to="/Login">Login</Link>
        {/* <Link to="/Signup">Signup</Link> */}
      </RsNavBar>
    );
  }
}
