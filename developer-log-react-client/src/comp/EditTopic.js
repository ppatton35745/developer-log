import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EditResource extends Component {
  state = {
    name: this.props.topic.name,
    submitted: false
  };

  componentDidMount() {}

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateTopic = e => {
    e.preventDefault();

    const updatedTopic = this.props.topic;
    updatedTopic["name"] = this.state.name;

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
              value={this.state.name}
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
