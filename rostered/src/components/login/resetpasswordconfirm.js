import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class ResetPasswordConfirm extends React.Component {


  render() {
    return (
      <div className="login__modal">
        <h1 className="login__modal__header">Password Reset</h1>
        <form className="login__modal__login-form">
          <p className="login__modal__login-form__label">Your password has been reset.</p>
          <Link exact to="/" className="login__modal__login-form__link" onClick={() => this.props.handleLogin() }>Return to Login</Link>
        </form>
      </div>
    );
  }
}

export default ResetPasswordConfirm;
