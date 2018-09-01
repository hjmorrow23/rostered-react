import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import $ from 'jquery';
import {
  Route,
  Link
} from 'react-router-dom';

class UserProfileView extends React.Component {

  menuToggle (e) {
    e.preventDefault();
    $(".js-profile-options").slideToggle();
  }

  render () {
    let user = this.props.user;

    return (
        <div className="profile__container">
          <div className="profile">
            <div className="profile__left">
              <h1 className="profile__left__title"></h1>
              <div className="profile__left__image">
                <img src="http://lorempixel.com/200/200/sports" />
              </div>
            </div>
            <div className="profile__right">
              <div className="profile__right__links">
                <a href="" className="profile__right__links__button" onClick={(e) => this.menuToggle(e)} ><i className="fa fa-ellipsis-v"></i></a>
                <ul className="profile__right__links__menu js-profile-options">
                  <li className="profile__right__links__menu__item">
                    <a href="" className="profile__right__links__menu__item__link" onClick={this.props.onClick}>Edit User</a>
                  </li>
                </ul>
              </div>
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Username</dt>
                  <dd className="profile__right__list__item__data">{user.displayName}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Position</dt>
                  <dd className="profile__right__list__item__data"></dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Created</dt>
                  <dd className="profile__right__list__item__data">Today</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
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

export default UserProfileView;
