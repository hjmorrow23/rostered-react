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

  componentWillMount() {
    document.addEventListener('mousedown', this.clickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside, false);
  }

  clickOutside(e) {
    let menuWrapper = document.querySelector(".App-nav__list__item__sublist");
    if (!menuWrapper.contains(e.target)) {
      $(".App-nav__list__item__sublist").hide();
    }
  }

  sublistToggle(e) {
    e.preventDefault();
    $(".App-nav__list__item__sublist").toggle();
  }

  mobileSublistToggle(e) {
    e.preventDefault();
    $(".App-header__sublist").toggle();
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
            {
              this.props.currentUser.role === "admin" || this.props.currentUser.role === "league-admin" || this.props.currentUser.role === "coach" ?
                <li className="App-nav__list__item"><NavLink exact to="/players" className="App-nav__list__item__link">Players</NavLink></li>
              : ""
            }
            <li className="App-nav__list__item"><NavLink exact to="/schedule" className="App-nav__list__item__link">Schedule</NavLink></li>
            <li className="App-nav__list__item">
              <a href="" onClick={(e) => this.sublistToggle(e)} className="App-nav__list__item__profile">
                <img className="App-nav__list__item__profile--image" src={this.props.currentUser.photoUrl} alt={this.props.currentUser.firstName} />
              </a>
              <ul className="App-nav__list__item__sublist">
                <li className="App-nav__list__item__sublist__item"><Link exact to="/user/profile" className="App-nav__list__item__sublist__item__link">Profile</Link></li>
                {/* }<li className="App-nav__list__item__sublist__item"><Link exact to="/user/settings" className="App-nav__list__item__sublist__item__link">Settings</Link></li> */}
                <li className="App-nav__list__item__sublist__item"><Link exact to="/" className="App-nav__list__item__sublist__item__link" onClick={(e) => this.props.handleLogout(e)}>Logout</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <a href="" className="mobile-nav-trigger" onClick={(e) => this.props.openMobileNav(e)}>
          <i className="fa fa-bars"></i>
        </a>
        <a href="" onClick={(e) => this.mobileSublistToggle(e)} className="App-header__profile">
          <img className="App-header__profile--image" src={this.props.currentUser.photoUrl} alt={this.props.currentUser.firstName} />
          <ul className="App-header__sublist">
            <li className="App-header__sublist__item"><Link exact to="/user/profile" className="App-nav__list__item__sublist__item__link">Profile</Link></li>
            {/* }<li className="App-nav__list__item__sublist__item"><Link exact to="/user/settings" className="App-nav__list__item__sublist__item__link">Settings</Link></li> */}
            <li className="App-header__sublist__item"><Link exact to="/" className="App-nav__list__item__sublist__item__link" onClick={(e) => this.props.handleLogout(e)}>Logout</Link></li>
          </ul>
        </a>
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
