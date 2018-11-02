import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Link, Redirect } from "react-router-dom";
export default class Resource extends Component {
  state = {
    resource: {
      resourceAttributeValues: [],
      resourceTopics: []
    },
    deleted: false
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

  deleteResource = e => {
    if (this.state.resource["resourceId"]) {
      APIManager.deleteResource(this.props.resource["resourceId"]).then(resp =>
        this.setState({
          deleted: true
        })
      );
    }
  };

  render() {
    console.log("this state is delted", this.state.deleted);
    if (this.state.deleted === false) {
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
          <button onClick={e => this.deleteResource(e)}>Delete</button>
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
    } else {
      return (
        <Redirect
          to={{
            pathname: `/ResourceTypes/${this.state.resource["resourceTypeId"]}`,
            state: {
              resourceType: this.state.resource["resourceType"]
            }
          }}
        />
      );
    }
  }
}
