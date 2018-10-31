import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../api/APIManager";

export default class TopicList extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    APIManager.getAllTopics().then(topics =>
      this.setState({
        topics: topics
      })
    );
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    // stateToChange.animals = this.state.animals;
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.topics.map(topic => (
          <Link
            key={topic["topicId"]}
            className="topic-link"
            to={{
              pathname: `/topics/${topic["topicId"]}`,
              state: {
                topic: topic
              }
            }}
          >
            {topic["name"]}
          </Link>
        ))}
      </React.Fragment>
    );
  }
}
