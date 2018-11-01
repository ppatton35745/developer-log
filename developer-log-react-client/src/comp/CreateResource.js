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

export default class CreateResource extends Component {
  state = {
    resourceTypeId: this.props.resourceType["resourceTypeId"],
    name: "",
    resourceTopics: [],
    resourceAttributeValues: [],
    topics: [],
    submitted: false,
    availableTopics: []
  };

  componentDidMount() {
    APIManager.getResourceTypeResources(
      this.props.resourceType["resourceTypeId"]
    ).then(rt => {
      const rtas = rt[0]["resourceTypeAttributes"];
      const temp = [];
      for (let i = 0; i < rtas.length; i++) {
        temp.push({
          id: rtas[i]["resourceTypeAttributeId"],
          label: rtas[i]["resourceAttribute"]["name"],
          value: ""
        });
      }
      this.setState({
        resourceAttributeValues: temp
      });
    });

    APIManager.getAllTopics().then(topics => {
      let availableTopics = topics.map(topic => ({
        id: topic["topicId"],
        name: topic["name"]
      }));
      this.setState({
        availableTopics: availableTopics
      });
    });
  }

  handleFieldChange = evt => {
    const stateToChange = { topic: {} };
    stateToChange.topic[evt.target.id] = evt.target.value;
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

  createNewTopic = e => {
    e.preventDefault();
    APIManager.createNewTopic(this.state.resource).then(response => {
      this.setState({
        topic: response,
        submitted: true
      });
    });
  };

  handleMultiSelectChange = e => {
    console.log("multiselectChange", e);
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
          <form onSubmit={e => this.createNewTopic(e)}>
            <h3>Add New Resource</h3>
            <label htmlFor="newTopic">New Resource Name</label>
            <input
              onChange={this.handleFieldChange}
              type="text"
              id="name"
              placeholder="Enter New Topic Name"
              required=""
            />

            {this.state.resourceAttributeValues.map(rav => (
              <React.Fragment>
                <label>{rav["label"]}</label>
                <input
                  onChange={e => this.changeAttribute(e)}
                  type="text"
                  id={rav["id"]}
                  placeholder="Enter New Topic Name"
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
            pathname: "/Topics"
            // state: {
            //   topic: this.state.topic
            // }
          }}
        />
      );
    }
  }
}
