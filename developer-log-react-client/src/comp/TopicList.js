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
        <h3>Topics</h3>
        <button>
          <Link to="/CreateTopic">New Topic</Link>
        </button>
        <ul>
          {this.state.topics.map(topic => (
            <li key={topic["topicId"]}>
              <Link
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
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
