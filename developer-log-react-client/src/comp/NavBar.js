import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { rsNavBar } from "reactstrap";
export default class NavBar extends Component {
  render() {
    return (
      <rsNavBar>
        <Link to="/">Locations</Link>
        <Link to="/TopicList">Topics</Link>
        <Link to="/ResourceTypeList">Resources</Link>
      </rsNavBar>
    );
  }
}
