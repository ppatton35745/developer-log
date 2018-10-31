import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../api/APIManager";

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
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  {topicResourceType["resourceTypeAttributes"].map(
                    resourceTypeAttribute => (
                      <th>
                        {resourceTypeAttribute["resourceAttribute"]["name"]}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {topicResourceType["resources"].map(resource => (
                  <tr>
                    <td>{resource["name"]}</td>
                    {resource["resourceAttributeValues"].map(
                      resourceAttributeValue => (
                        <td>{resourceAttributeValue["value"]}</td>
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

{
  /* <table class="table">
    <thead>
        <tr>
            <th>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                
            </td>
        </tr>
    </tbody>
</table> */
}
