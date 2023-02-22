import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";

import UserService from "../services/user.service";
import { withRouter } from '../common/with-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.router.state);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "hi" },
      canEdit: false
    };
  }

  componentDidMount() {
    console.log(this.props.router.location.pathname);
    UserService.getProfileBoard(this.props.router.location.state.currentUser.username).then(
        response => {
          this.setState({
            currentUser: response.data,
            userReady: true
          });
        },
        error => {
          console.log(error.toString());
          this.setState({
            redirect: "/home"
          });
        }
      );
      
    const user = UserService.getCurrentUser();
    user.then(response => {
        this.setState({
            canEdit: response === this.state.currentUser.username
        });
        console.log(response);
        console.log(this.state.currentUser.username);
    });
  }

  

  componentDidUpdate() {
    console.log("Updated:" + this.props.router.location.pathname);
    
}

  render() {    
    console.log(this.props.router.location.state);

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    if(this.props.router.location.state.currentUser.username !== this.state.currentUser.username) {
        //we reach this when switching from one profile page to another
        this.componentDidMount();
    }
    const { currentUser } = this.state;
    console.log(currentUser.creations)

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong>'s Profile
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

        <div className="container">
            {
            (this.state.canEdit) ?
            <div>
                <Link to={"/profile/edit"} state = {
                          {currentUser: { username: currentUser.username }}
                        } className="nav-link">
                  Edit
                </Link> 
            </div>: null
            }
        </div>
    
        <strong>Creations:</strong>
        <ul>
          {currentUser.creations &&
            currentUser.creations.map((creation, index) => <li key={index}>
                <div>
                    {creation.title} 
                    <br/>
                    {creation.description}
                    </div>
                
                </li>)}
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

export default withRouter(Profile);