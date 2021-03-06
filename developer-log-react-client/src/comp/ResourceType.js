import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Link } from "react-router-dom";

export default class ResourceType extends Component {
  state = {
    resourceType: []
  };

  componentDidMount() {
    console.log("resourceTypeId", this.props.resourceType["resourceTypeId"]);
    APIManager.getResourceTypeResources(
      this.props.resourceType["resourceTypeId"]
    ).then(resources => {
      console.log("resource", resources);
      this.setState({
        resourceType: resources
      });
    });
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
        <h1>{this.props.resourceType["name"]}</h1>
        {this.state.resourceType.map(resourceType => (
          <React.Fragment key={resourceType["resourceTypeId"]}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  {resourceType["resourceTypeAttributes"].map(
                    resourceTypeAttribute => (
                      <th>
                        {resourceTypeAttribute["resourceAttribute"]["name"]}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {resourceType["resources"].map(resource => (
                  <tr key={resource["resourceId"]}>
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
                        //   key={
                        //     resourceAttributeValue["resourceAttributeValueId"]
                        //   }
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
