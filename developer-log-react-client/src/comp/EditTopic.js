import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EditResource extends Component {
  state = {
    fields: { name: this.props.topic.name },
    errors: {},
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

  updateTopic = e => {
    e.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    let updatedTopic = this.props.topic;
    updatedTopic["name"] = this.state.fields["name"];

    APIManager.updateTopic(updatedTopic).then(response => {
      this.setState({
        submitted: true
      });
    });
  };

  render() {
    if (this.state.submitted === false) {
      return (
        <React.Fragment>
          <form onSubmit={e => this.updateTopic(e)}>
            <h3>Edit Topic</h3>
            <label htmlFor="editTopic">Name</label>
            <input
              onChange={e => this.handleFieldChange(e)}
              type="text"
              id="name"
              value={this.state.fields["name"]}
              required=""
            />

            <button type="submit">Submit</button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/Topics"
          }}
        />
      );
    }
  }
}
