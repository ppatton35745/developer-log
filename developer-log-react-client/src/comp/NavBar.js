import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar as RsNavBar } from "reactstrap";
export default class NavBar extends Component {
  logOut() {
    const user = "";
    this.props.setUser(user);
    localStorage.removeItem("DevLogToken");
  }
  render() {
    if (this.props.currentUser.length > 0) {
      return (
        <RsNavBar>
          <Link to="/TopicList">Topics</Link>
          <Link to="/ResourceTypeList">Resources</Link>
          <label>Welcome {this.props.currentUser}</label>
          <Link to="/Login" onClick={this.logOut}>
            Log Out
          </Link>
        </RsNavBar>
      );
    }
    return (
      <RsNavBar>
        <Link to="/TopicList">Topics</Link>
        <Link to="/ResourceTypeList">Resources</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
      </RsNavBar>
    );
  }
}
