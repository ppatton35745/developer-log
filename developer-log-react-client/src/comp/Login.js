import React, { Component } from "react";

export default class Login extends Component {
  // Set initial state
  state = {
    fields: {},
    errors: {}
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    let fields = this.state.fields;
    fields[evt.target.id] = evt.target.value;
    this.setState({ fields });
  };

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Name
    if (!fields["password"] || !(fields["password"].length > 0)) {
      console.log("failed password validation");
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    console.log("email", this.state.fields["email"]);
    console.log("password", this.state.fields["password"]);

    fetch("http://localhost:5000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserName: this.state.fields["email"],
        Password: this.state.fields["password"]
      })
    })
      .then(res => res.text())
      .then(OfficialAPIToken => {
        localStorage.setItem("DevLogToken", OfficialAPIToken);
        return OfficialAPIToken;
      })
      .then(
        tok =>
          fetch("http://localhost:5000/api/User", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${tok}`
            }
          })
            .then(resp => resp.json())
            .then(resp => {
              sessionStorage.setItem("currentUser", resp["firstName"]);
              this.props.setUser(resp["firstName"]);
            })
        // .then(resp => this.props.setUser(resp["firstName"]))
      );
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail">Email address</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          id="email"
          placeholder="Email address"
          required=""
          autoFocus=""
        />
        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
        <br />
        <label htmlFor="inputPassword">Password</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required=""
        />
        <button type="submit">Sign in</button>
        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
        <br />
      </form>
    );
  }
}
