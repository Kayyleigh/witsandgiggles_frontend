import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <strong>Users:</strong>
        <ul>
          {this.state.content &&
            this.state.content.map((username, index) => 
            <li key={index}>  
                  <Link to={"/profile/:" + username} state = {
                          {currentUser: { username: username }}
                    } className="nav-link">
                  {username}
                </Link>            
            </li>)}
        </ul>
        </header>
    </div>


    );
  }
}