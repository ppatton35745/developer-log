import React, { Component } from "react";
import "./App.css";
import NavBar from "./comp/NavBar";
import ApplicationViews from "./comp/ApplicationViews";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
