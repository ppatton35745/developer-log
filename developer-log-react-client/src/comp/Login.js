import React, { Component } from "react";

export default class Login extends Component {
  // Set initial state
  state = {
    UserName: "",
    Password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();

    fetch("http://localhost:5000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserName: this.state.UserName,
        Password: this.state.Password
      })
    })
      .then(res => res.text())
      .then(OfficialAPIToken => {
        localStorage.setItem("DevLogToken", OfficialAPIToken);
        return OfficialAPIToken;
      })
      .then(tok =>
        fetch("http://localhost:5000/api/User", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tok}`
          }
        })
          .then(resp => resp.json())
          .then(resp => this.props.setUser(resp["firstName"]))
      );
  };

  setUser() {}

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail">Email address</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          id="UserName"
          placeholder="Email address"
          required=""
          autoFocus=""
        />
        <label htmlFor="inputPassword">Password</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="Password"
          placeholder="Password"
          required=""
        />
        <button type="submit">Sign in</button>
      </form>
    );
  }
}
