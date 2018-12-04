import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  getEmail(e) {
    let email = e.target.value;
    this.setState({
      email: email
    });

  }

  getPassword(e) {
    let password = e.target.value;
    this.setState({
      password: password
    });
  }

  signIn(e) {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    this.props.handleLogin(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="login__modal">
          <h1 className="login__modal__header">Rostered</h1>
          <form className="login__modal__login-form">
            <label className="login__modal__login-form__label">Email</label>
            <input id="username" onChange={(e) => this.getEmail(e)} className="login__modal__login-form__input" type="text" />
            <label className="login__modal__login-form__label">Password</label>
            <input id="password" onChange={(e) => this.getPassword(e)} className="login__modal__login-form__input" type="password" />
            <Link exact to="/" onClick={(e) => this.signIn(e) }><input id="submit-button" className="login__modal__login-form__button" type="submit" /></Link>
            <Link exact to="/signup" className="login__modal__login-form__link">Sign Up</Link>
            <Link exact to="/resetpassword" className="login__modal__login-form__link">Forgot Password?</Link>
          </form>
      </div>
    );
  }
}

export default LoginForm;
