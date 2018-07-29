import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
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
    if(this.state.password1 === this.state.password2) {
      this.props.handleSignup(this.state.email, this.state.username, this.state.password1, this.state.password2);
    } else {
      alert("passwords don't match");
    }
  }

  render() {
    return (
      <div className="login__modal signup-modal">
        <h1 className="login__modal__header">Register</h1>
        <form className="login__modal__login-form">
          <label className="login__modal__login-form__label">Email</label>
          <input id="email" onChange={(e) => this.getEmail(e)} className="login__modal__login-form__input" type="text" />
          <label className="login__modal__login-form__label">Username</label>
          <input id="username" onChange={(e) => this.getUsername(e)} className="login__modal__login-form__input" type="text" />
          <label className="login__modal__login-form__label">Password</label>
          <input id="password1" onChange={(e) => this.getPassword1(e)} className="login__modal__login-form__input" type="password" />
          <label className="login__modal__login-form__label">Retype Password</label>
          <input id="password2" onChange={(e) => this.getPassword2(e)} className="login__modal__login-form__input" type="password" />
          <Link exact to="/" onClick={(e) => this.signUp(e) }><input id="submit-button" className="login__modal__login-form__button" type="submit" /></Link>
        </form>
      </div>
    );
  }
}

export default SignupForm;
