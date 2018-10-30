import { Route } from "react-router-dom";
import React, { Component } from "react";
import TopicList from "./TopicList";
import Topic from "./Topic";
import ResourceTypeList from "./ResourceTypeList";
import ResourceType from "./ResourceType";
import Resource from "./Resource";
import Login from "./Login";
import Signup from "./Signup";

export default class ApplicationViews extends Component {
  // Check if credentials are in local storage
  isAuthenticated = () => localStorage.getItem("DevLogToken") !== null;

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
              return <Login setUser={this.props.setUser} />;
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
              return <Login setUser={this.props.setUser} />;
            }
          }}
        />
        <Route
          exact
          path="/Login"
          render={props => {
            return <Login setUser={this.props.setUser} />;
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
                  key={props.location.state.location.id}
                  location={props.location.state.location}
                />
              );
            } else {
              return <Login setUser={this.props.setUser} />;
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
              return <Login setUser={this.props.setUser} />;
            }
          }}
        />
        <Route
          path="/ResourceTypes/:ResourceTypeId"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceType
                  key={props.location.state.animal.id}
                  animal={props.location.state.animal}
                  // checkOutAnimal={props.location.state.checkOutAnimal}
                />
              );
            } else {
              return <Login setUser={this.props.setUser} />;
            }
          }}
        />
        <Route
          exact
          path="/Resources/:ResourceId"
          render={props => {
            if (this.isAuthenticated()) {
              return <Resource />;
            } else {
              return <Login setUser={this.props.setUser} />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}
