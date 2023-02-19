import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";


import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = UserService.getCurrentUser();
    user.then(result => this.setState({ currentUser: result }));
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  

  render() {
    const { currentUser, showAdminBoard } = this.state;
    console.log(currentUser);

    return (
      
      <div>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
         <Link to={"/"} className="navbar-brand">     	   
            WitsAndRiddles
          </Link>      
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/home"} className="nav-link">    
                Home
              </Link> 
            </li> 

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>



          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link 
                  to={"/profile/:" + currentUser} 
                  state = {
                          {currentUser: { username: currentUser }}
                    } 
                  className="nav-link">
                    {currentUser}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile/>} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    );    
  }
}

export default App;