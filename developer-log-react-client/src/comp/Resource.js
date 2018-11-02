import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Link } from "react-router-dom";
export default class Resource extends Component {
  state = {
    resource: {
      resourceAttributeValues: [],
      resourceTopics: []
    }
  };

  componentDidMount() {
    APIManager.getResourceDetails(this.props.resource["resourceId"]).then(
      resource =>
        this.setState({
          resource: resource
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
        <h1>{this.props.resource["name"]}</h1>
        <button>
          <Link
            className="topic-link"
            to={{
              pathname: `/editResource/${this.props.resource["resourceId"]}`,
              state: {
                resource: this.state.resource
              }
            }}
          >
            Edit
          </Link>
        </button>
        <dl>
          {this.state.resource["resourceAttributeValues"].map(rav => (
            <React.Fragment key={rav["resourceAttributeValueId"]}>
              <dt>
                {rav["resourceTypeAttribute"]["resourceAttribute"]["name"]}
              </dt>
              <dd>{rav["value"]}</dd>
            </React.Fragment>
          ))}
          <dt>Topics</dt>
          {this.state.resource["resourceTopics"].map(rt => (
            <dd key={rt["resourceTopicId"]}>{rt["topic"]["name"]}</dd>
          ))}
        </dl>
      </React.Fragment>
    );
  }
}
