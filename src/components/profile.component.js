import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = UserService.getCurrentUser();
    currentUser.then(result => this.setState({ currentUser: result }));


    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Bio:</strong>{" "}
          {currentUser.bio}
        </p>
        <strong>Creations:</strong>
        <ul>
          {currentUser.creations &&
            currentUser.creations.map((creation, index) => <li key={index}>{creation}</li>)}
        </ul>
        <strong>Solves:</strong>
        <ul>
          {currentUser.solves &&
            currentUser.solves.map((solve, index) => <li key={index}>{solve}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}