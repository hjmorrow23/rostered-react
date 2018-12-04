import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class ResetPasswordEmail extends React.Component {


  render() {
    return (
      <div className="login__modal">
        <h1 className="login__modal__header">Reset Password</h1>
        <form className="login__modal__login-form">
          <label className="login__modal__login-form__label">Email</label>
          <input id="username" className="login__modal__login-form__input" type="text" />
          <Link exact to="/" onClick={() => this.props.handleLogin() }><input id="submit-button" className="login__modal__login-form__button" type="submit" /></Link>
        </form>
      </div>
    );
  }
}

export default ResetPasswordEmail;
