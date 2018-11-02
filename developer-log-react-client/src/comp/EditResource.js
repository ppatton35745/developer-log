import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Redirect } from "react-router-dom";
import FilteredMultiSelect from "react-filtered-multiselect";
import "bootstrap/dist/css/bootstrap.min.css";

const BOOTSTRAP_CLASSES = {
  filter: "form-control",
  select: "form-control",
  button: "btn btn btn-block btn-default",
  buttonActive: "btn btn btn-block btn-primary"
};

export default class EditResource extends Component {
  state = {
    resourceTypeId: this.props.resource["resourceTypeId"],
    name: this.props.resource["name"],
    resourceId: this.props.resource["resourceId"],
    resourceTopics: [],
    resourceAttributeValues: [],
    topics: [],
    submitted: false,
    availableTopics: [],
    resourceType: []
  };

  componentDidMount() {
    const rtas = this.props.resource["resourceAttributeValues"];
    const temp = [];
    for (let i = 0; i < rtas.length; i++) {
      temp.push({
        id: rtas[i]["resourceTypeAttributeId"],
        label: rtas[i]["resourceTypeAttribute"]["resourceAttribute"]["name"],
        value: rtas[i]["value"]
      });
    }

    let resourceTopics = this.props.resource["resourceTopics"].map(rt => ({
      id: rt["topicId"],
      name: rt["topic"]["name"]
    }));

    let availableTopics = [];

    APIManager.getAllTopics()
      .then(topics => {
        availableTopics = topics.map(topic => ({
          id: topic["topicId"],
          name: topic["name"]
        }));

        return availableTopics;
      })
      .then(availableTopics =>
        this.setState({
          resourceAttributeValues: temp,
          availableTopics: availableTopics,
          resourceTopics: resourceTopics
        })
      );
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  changeAttribute = evt => {
    const tempRavs = this.state.resourceAttributeValues;
    const indexToChange = tempRavs.findIndex(
      r => r["id"] === parseInt(evt.target.id)
    );
    tempRavs[indexToChange]["value"] = evt.target.value;

    this.setState({
      resourceAttributeValues: tempRavs
    });
  };

  updateResource = e => {
    e.preventDefault();

    const tempResourceTopics = this.state.resourceTopics.map(topic => ({
      topicId: topic["id"]
    }));
    const tempResourceAttributeValues = this.state.resourceAttributeValues.map(
      rav => ({ resourceTypeAttributeId: rav["id"], value: rav["value"] })
    );
    const resource = {
      resourceId: this.state.resourceId,
      resourceTypeId: this.state.resourceTypeId,
      name: this.state.name,
      resourceTopics: tempResourceTopics,
      resourceAttributeValues: tempResourceAttributeValues
    };

    console.log("resource About to post", resource);

    APIManager.updateResource(resource).then(response => {
      APIManager.getResourceTypeResources(this.state.resourceTypeId).then(
        resources =>
          this.setState({
            resourceType: resources[0],
            resourceTypeId: resources[0]["resourceTypeId"],
            submitted: true
          })
      );
    });
  };

  handleDeselect(index) {
    var resourceTopics = this.state.resourceTopics.slice();
    resourceTopics.splice(index, 1);
    this.setState({ resourceTopics });
  }

  handleClearSelection = e => {
    this.setState({ resourceTopics: [] });
  };
  handleSelectionChange = resourceTopics => {
    resourceTopics.sort((a, b) => a.id - b.id);
    this.setState({ resourceTopics });
  };

  render() {
    if (this.state.submitted === false) {
      return (
        <React.Fragment>
          <form onSubmit={e => this.updateResource(e)}>
            <h3>Edit Resource</h3>
            <label htmlFor="newResource">Name</label>
            <input
              onChange={e => this.handleFieldChange(e)}
              type="text"
              id="name"
              value={this.state.name}
              required=""
            />

            {this.state.resourceAttributeValues.map(rav => (
              <React.Fragment>
                <label>{rav["label"]}</label>
                <input
                  onChange={e => this.changeAttribute(e)}
                  type="text"
                  id={rav["id"]}
                  value={rav["value"]}
                  required=""
                />
              </React.Fragment>
            ))}

            <div className="row">
              <div className="col-md-5">
                <FilteredMultiSelect
                  classNames={BOOTSTRAP_CLASSES}
                  onChange={this.handleSelectionChange}
                  options={this.state.availableTopics}
                  selectedOptions={this.state.resourceTopics}
                  textProp="name"
                  valueProp="id"
                />
                <p className="help-block">
                  Press Enter when there's only one matching item to select it.
                </p>
              </div>
              <div className="col-md-5">
                {this.state.resourceTopics.length === 0 && (
                  <p>(nothing selected yet)</p>
                )}
                {this.state.resourceTopics.length > 0 && (
                  <ol>
                    {this.state.resourceTopics.map((topic, i) => (
                      <li key={topic.id}>
                        {`${topic.name} `}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleDeselect(i)}
                        >
                          &times;
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {this.state.resourceTopics.length > 0 && (
                  <button
                    style={{ marginLeft: 20 }}
                    className="btn btn-default"
                    onClick={this.handleClearSelection}
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: `/ResourceTypes/${this.state.resourceTypeId}`,
            state: {
              resourceType: this.state.resourceType
            }
          }}
        />
      );
    }
  }
}
