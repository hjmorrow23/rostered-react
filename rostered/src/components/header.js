import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <h1 className="App-title">Rostered</h1>
      <nav className="App-nav">
        <ul className="App-nav__list">
          <li className="App-nav__list__item"><NavLink exact to="/home">Home</NavLink></li>
          <li className="App-nav__list__item"><NavLink exact to="/leagues">Leagues</NavLink></li>
          <li className="App-nav__list__item"><NavLink exact to="/teams">Teams</NavLink></li>
          <li className="App-nav__list__item"><NavLink exact to="/players">Players</NavLink></li>
          <li className="App-nav__list__item">
            <NavLink exact to="/" className="App-nav__list__item__profile" onClick={(e) => this.props.handleLogout(e)}>Image</NavLink>
            <ul className="App-nav__list__item__sublist">
              <li className="App-nav__list__item__sublist__item"><Link exact to="/user/profile">Profile</Link></li>
              <li className="App-nav__list__item__sublist__item"><Link exact to="/user/settings">Settings</Link></li>
              <li className="App-nav__list__item__sublist__item"><Link exact to="/">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// LeagueStatStatic.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default Header;
