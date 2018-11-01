import React, { Component } from "react";
import APIManager from "../api/APIManager";
import { Redirect } from "react-router-dom";

export default class CreateResource extends Component {
  state = {
    resourceTypeId: this.props.resourceType["resourceTypeId"],
    name: "",
    resourceTopics: [],
    resourceAttributeValues: [],
    topics: [],
    submitted: false
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

    APIManager.getAllTopics().then(topics =>
      this.setState({
        topics: topics
      })
    );
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
