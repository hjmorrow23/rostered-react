import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
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

  getName(e) {
    let name = e.target.value;
    this.setState({
      name: name
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
    e.preventDefault();
    // if(this.state.password1 === this.state.password2) {
      this.props.handleSignup(this.state.email, this.state.name, this.state.username);
      switch (this.state.role) {
        case "player":
          this.props.history.push('/leaguesetup');
          break;
        case "coach":
          this.props.history.push('/leaguesetup');
          break;
        case "league-admin":
          this.props.history.push('/leaguesetup');
          break;
      }
    // } else {
    //   alert("passwords don't match");
    // }
  }

  render() {
    return (
      <div className="login__modal signup-modal">
        <h1 className="login__modal__header">Register</h1>
        <form className="login__modal__login-form">
          <label className="login__modal__login-form__label">Email</label>
          <input id="email" onChange={(e) => this.getEmail(e)} className="login__modal__login-form__input" type="text" />
          <label className="login__modal__login-form__label">Name</label>
          <input id="name" onChange={(e) => this.getName(e)} className="login__modal__login-form__input" type="text" />
          <label className="login__modal__login-form__label">Username</label>
          <input id="username" onChange={(e) => this.getUsername(e)} className="login__modal__login-form__input" type="text" />
          {/* <label className="login__modal__login-form__label">Which best describes your role in the league?</label>
          <select id="role" onChange={(e) => this.getRole(e)} className="login__modal__login-form__input">
            <option value="player">Player</option>
            <option value="coach">Coach</option>
            <option value="league-admin">League Administrator</option>
          </select>
           <label className="login__modal__login-form__label">Password</label>
          <input id="password1" onChange={(e) => this.getPassword1(e)} className="login__modal__login-form__input" type="password" />
          <label className="login__modal__login-form__label">Retype Password</label>
          <input id="password2" onChange={(e) => this.getPassword2(e)} className="login__modal__login-form__input" type="password" /> */}
          <Link exact to="/home" onClick={(e) => this.signUp(e) }><input id="submit-button" className="login__modal__login-form__button" type="submit" /></Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
