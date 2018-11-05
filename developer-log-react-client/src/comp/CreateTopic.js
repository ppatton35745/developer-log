import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Redirect } from "react-router-dom";

export default class CreateTopic extends Component {
  state = {
    fields: {},
    errors: {},
    topic: {},
    submitted: false
  };

  componentDidMount() {}

  handleFieldChange = evt => {
    let fields = this.state.fields;
    fields[evt.target.id] = evt.target.value;
    this.setState({ fields });
  };

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"] || !(fields["name"].length > 0)) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  createNewTopic = e => {
    e.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    APIManager.createNewTopic({ name: this.state.fields["name"] }).then(
      response => {
        this.setState({
          topic: response,
          submitted: true
        });
      }
    );
  };

  render() {
    if (this.state.submitted === false) {
      return (
        <React.Fragment>
          <form onSubmit={e => this.createNewTopic(e)}>
            <h3>Add New Topic</h3>
            <label htmlFor="newTopic">New Topic</label>
            <input
              onChange={e => this.handleFieldChange(e)}
              type="text"
              id="name"
              placeholder="Enter New Topic Name"
              required=""
            />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
            <br />
            <button type="submit">Submit</button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/Topics"
            // state: {
            //   topic: this.state.topic
            // }
          }}
        />
      );
    }
  }
}
