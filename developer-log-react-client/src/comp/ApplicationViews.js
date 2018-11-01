import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TopicList from "./TopicList";
import Topic from "./Topic";
import ResourceTypeList from "./ResourceTypeList";
import ResourceType from "./ResourceType";
import Resource from "./Resource";
import Login from "./Login";
import Signup from "./Signup";
import CreateTopic from "./CreateTopic";
import CreateResource from "./CreateResource";

export default class ApplicationViews extends Component {
  // Check if credentials are in local storage
  isAuthenticated = () => {
    return (
      localStorage.getItem("DevLogToken") !== null &&
      sessionStorage.getItem("currentUser") !== null
    );
  };

  // blah blah git test

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <TopicList />;
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/Topics"
          render={props => {
            if (this.isAuthenticated()) {
              return <TopicList />;
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/Login"
          render={props => {
            if (this.isAuthenticated()) {
              return <Redirect to="/" />;
            } else {
              return (
                <Login
                  setUser={this.props.setUser}
                  currentUser={this.props.currentUser}
                />
              );
            }
          }}
          setUser={this.props.setUser}
        />
        <Route
          exact
          path="/Signup"
          render={props => {
            return <Signup setUser={this.props.setUser} />;
          }}
        />
        <Route
          path="/Topics/:TopicId"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Topic
                  key={props.location.state.topic["topicId"]}
                  topic={props.location.state.topic}
                />
              );
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/ResourceTypes"
          render={props => {
            if (this.isAuthenticated()) {
              return <ResourceTypeList />;
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          path="/ResourceTypes/:ResourceTypeId"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceType
                // key={props.location.state.resourceType["resourceTypeId"]}
                // resourceType={props.location.state.resourceType}
                />
              );
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/Resources/:ResourceId"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Resource
                  key={props.location.state.resource["resourceId"]}
                  resource={props.location.state.resource}
                />
              );
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/CreateTopic"
          render={props => {
            if (this.isAuthenticated()) {
              return <CreateTopic />;
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
        <Route
          exact
          path="/CreateResource"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <CreateResource
                  key={props.location.state.resourceType["resourceTypeId"]}
                  resourceType={props.location.state.resourceType}
                />
              );
            } else {
              return <Redirect to="/Login" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}
