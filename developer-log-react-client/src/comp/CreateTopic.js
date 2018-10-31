import React, { Component } from "react";
import APIManager from "./APIManager";
import { Redirect } from "react-router-dom";

export default class CreateTopic extends Component {
  state = {
    topic: { name: "" },
    submitted: false
  };

  componentDidMount() {}

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange.topic[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createNewTopic = () => {
    APIManager.createNewTopic(this.state.topic).then(response => {
      console.log(response);
    });
  };

  render() {
    if (this.state.submitted === false) {
      return (
        <React.Fragment>
          <form onSubmit={this.createNewTopic}>
            <h3>Add New Topic</h3>
            <label htmlFor="newTopic">New Topic</label>
            <input
              onChange={this.handleFieldChange}
              type="text"
              id="name"
              placeholder="Enter New Topic Name"
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
            pathname: `/topics/${this.state.topic["topicId"]}`,
            state: {
              topic: this.state.topic
            }
          }}
        />
      );
    }
  }
}
