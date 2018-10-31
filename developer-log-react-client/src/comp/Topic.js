import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Link } from "react-router-dom";

export default class Topic extends Component {
  state = {
    topicResourceTypes: []
  };

  componentDidMount() {
    APIManager.getTopicResources(this.props.topic["topicId"]).then(resources =>
      this.setState({
        topicResourceTypes: resources
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
        <h1>{this.props.topic["name"]}</h1>
        {this.state.topicResourceTypes.map(topicResourceType => (
          <React.Fragment>
            <h2>{topicResourceType["name"]}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  {topicResourceType["resourceTypeAttributes"].map(
                    resourceTypeAttribute => (
                      <th
                        key={resourceTypeAttribute["resourceTypeAttributeId"]}
                      >
                        {resourceTypeAttribute["resourceAttribute"]["name"]}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {topicResourceType["resources"].map(resource => (
                  <tr>
                    <td>
                      <Link
                        // key={resource["resourceId"]}
                        className="topic-link"
                        to={{
                          pathname: `/Resources/${resource["resourceId"]}`,
                          state: {
                            resource: resource
                          }
                        }}
                      >
                        {resource["name"]}
                      </Link>
                    </td>
                    {resource["resourceAttributeValues"].map(
                      resourceAttributeValue => (
                        <td
                          key={
                            resourceAttributeValue["resourceAttributeValueId"]
                          }
                        >
                          {resourceAttributeValue["value"]}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
