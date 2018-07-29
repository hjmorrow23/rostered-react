import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginform.js';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class Login extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="login__background">
            <Route exact path="/" render={() => <LoginForm />} />
        </div>
      </div>
    );
  }
}

// <input id="submit-button" className="login__modal__login-form__button" type="submit" />
// LeagueStatStatic.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default Login;
