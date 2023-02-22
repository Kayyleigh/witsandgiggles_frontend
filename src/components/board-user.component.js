import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { content } = this.state;
    console.log(content);
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>All sudokus</h3>
          </header>
                  <ul>
          {content &&
            content.map((creation, i) => <li key={i}>
                <div>
                    {creation.title} 
                    <br/>
                    {creation.description}
                    </div>
                
                </li>)}
        </ul>
      
      </div>
    );
  }
}