import React, { Component } from "react";
import "./App.css";
import NavBar from "./comp/NavBar";
import ApplicationViews from "./comp/ApplicationViews";

class App extends Component {
  state = {
    currentUser: ""
  };

  setUser = userFirstName => {
    this.setState({ currentUser: userFirstName });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar currentUser={this.state.currentUser} />
        <ApplicationViews setUser={this.setUser} />
      </React.Fragment>
    );
  }
}

export default App;
