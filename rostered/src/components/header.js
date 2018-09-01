import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  BrowserRouter,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

class Header extends React.Component {

  sublistToggle(e) {
    e.preventDefault();
    $(".App-nav__list__item__sublist").toggle();
  }

  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">Rostered</h1>
        <nav className="App-nav">
          <ul className="App-nav__list">
            <li className="App-nav__list__item"><NavLink exact to="/home" className="App-nav__list__item__link">Home</NavLink></li>
            <li className="App-nav__list__item"><NavLink exact to="/leagues" className="App-nav__list__item__link">Leagues</NavLink></li>
            <li className="App-nav__list__item"><NavLink exact to="/teams" className="App-nav__list__item__link">Teams</NavLink></li>
            <li className="App-nav__list__item"><NavLink exact to="/players" className="App-nav__list__item__link">Players</NavLink></li>
            <li className="App-nav__list__item"><NavLink exact to="/schedule" className="App-nav__list__item__link">Schedule</NavLink></li>
            <li className="App-nav__list__item">
              <a href="" onClick={(e) => this.sublistToggle(e)} className="App-nav__list__item__profile"></a>
              <ul className="App-nav__list__item__sublist">
                <li className="App-nav__list__item__sublist__item"><Link exact to="/user/profile" className="App-nav__list__item__sublist__item__link">Profile</Link></li>
                <li className="App-nav__list__item__sublist__item"><Link exact to="/user/settings" className="App-nav__list__item__sublist__item__link">Settings</Link></li>
                <li className="App-nav__list__item__sublist__item"><Link exact to="/" className="App-nav__list__item__sublist__item__link" onClick={(e) => this.props.handleLogout(e)}>Logout</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
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
