import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";
import CheckButton from "react-validation/build/button";

import { withRouter } from '../common/with-router';

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);

    this.state = {
        currentUser: { username: "hi" },
        bio: "",
        loading: false,
        message: ""
    };
  }

  onChangeBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const currentUser = this.props.router.location.state.currentUser;

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        UserService.updateBio(this.state.bio).then(
        () => {
          this.props.router.navigate("/profile/:" + currentUser.username, 
          { state:
            { currentUser: currentUser } 
          });
          //window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleUpdate}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <Input
                type="text"
                className="form-control"
                name="bio"
                value={this.state.bio}
                onChange={this.onChangeBio}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Update</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileEditor);