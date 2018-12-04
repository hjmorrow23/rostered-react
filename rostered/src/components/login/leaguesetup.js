import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class LeagueSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      role: "",
      password1: "",
      password2: ""

    };
  }

  getEmail(e) {
    let email = e.target.value;
    this.setState({
      email: email
    });

  }

  getUsername(e) {
    let username = e.target.value;
    this.setState({
      username: username
    });
  }

  getRole(e) {
    let role = e.target.value;
    this.setState({
      role: role
    });
  }

  getPassword1(e) {
    let password1 = e.target.value;
    this.setState({
      password1: password1
    });
  }

  getPassword2(e) {
    let password2 = e.target.value;
    this.setState({
      password2: password2
    });
  }

  signUp(e) {
    // e.preventDefault();
    if(this.state.password1 === this.state.password2) {
      this.props.handleSignup(this.state.email, this.state.username, this.state.role, this.state.password1, this.state.password2);
    } else {
      alert("passwords don't match");
    }
  }

  render() {
    return (
      <div className="login__modal signup-modal">
        <h1 className="login__modal__header">League Admin Setup</h1>
        <form className="login__modal__login-form">
          <label className="login__modal__login-form__label">Are you starting a new league or joining an existing league?</label>
          <Link exact to="/leagueadd"><input id="newLeague" className="login__modal__login-form__button" type="submit" value="Starting a new League" /></Link>
          <Link exact to="/leaguesearch"><input id="joinLeague" className="login__modal__login-form__button" type="submit" value="Joining a current League" /></Link>
        </form>
      </div>
    );
  }
}

export default LeagueSetup;
