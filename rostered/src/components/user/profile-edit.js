import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import {
  Route,
  Link
} from 'react-router-dom';

class UserProfileEdit extends React.Component {

  // onStatChange (e) {
  //   let title = document.getElementById('player-name').value;
  //   this.props.onClick(e, title);
  // }

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
                    <a href="" className="profile__right__links__menu__item__link" onClick={(e) => this.onStatChange(e)}>Save</a>
                  </li>
                  <li className="profile__right__links__menu__item">
                    <a href="" className="profile__right__links__menu__item__link" onClick={(e) => this.props.onEditToggle(e)}>Cancel</a>
                  </li>
                  <li className="profile__right__links__menu__item">
                    <a href="" className="profile__right__links__menu__item__link" onClick={(e) => this.toggleConfirm(e)}>Delete Team</a>
                  </li>
                </ul>
              </div>
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Team Name</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="user-name" className="profile__right__list__item__data__field" defaultValue="" />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Position</dt>
                  <dd className="profile__right__list__item__data"></dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Created</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="player-created-date" className="profile__right__list__item__data__field" defaultValue="today" />
                  </dd>
                </div>
              </dl>
                <div id="delete-team"className="panel panel__full-width modal">
                  <div className="panel__header">
                    <h1 className="panel__title">Are you sure?</h1>
                  </div>
                  <div className="panel__body">
                    <div className="panel__message-wrapper">
                      <p className="panel__message">This action will delete this team which can&#39;t be undone. Delete this team?</p>
                      <div className="panel__actions">
                        <a href="" className="panel__actions__link">Yes</a>
                        <a href="" className="panel__actions__link">No</a>
                      </div>
                    </div>
                  </div>
              </div>
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

export default UserProfileEdit;
