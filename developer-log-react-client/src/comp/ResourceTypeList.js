import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../api/APIManager";

export default class ResourceTypeList extends Component {
  state = {
    resourceTypes: []
  };

  componentDidMount() {
    APIManager.getAllResourceTypes().then(resourceTypes =>
      this.setState({
        resourceTypes: resourceTypes
      })
    );
  }

  render() {
    return (
      <React.Fragment>
        <h3>Resources</h3>
        <ul>
          {this.state.resourceTypes.map(resourceType => (
            <li key={resourceType["resourceTypeId"]}>
              <Link
                className="topic-link"
                to={{
                  pathname: `/ResourceTypes/${resourceType["resourceTypeId"]}`,
                  state: {
                    resourceType: resourceType
                  }
                }}
              >
                {resourceType["name"]}
              </Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
