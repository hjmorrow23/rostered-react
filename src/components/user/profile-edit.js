import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import ImageUpload from '../imageUpload.js';
import {
  Route,
  Link
} from 'react-router-dom';

class UserProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: "",
        lastName: "",
        email: "",
        photoUrl: ""
      },
      photoUrl: ""
    };
  }

  getPhotoUrl(url) {
    // this.setState({photoUrl: url});
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let photoUrl = url;
    let currentUser = {firstName, lastName, email, photoUrl};
    this.props.handleUser(firstName, lastName, email, photoUrl);
  }

  getUserInfo() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let email = document.getElementById('email');
    let photoUrl = this.state.photoUrl;
    let currentUser = {firstName, lastName, email, photoUrl};
  }

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
              <ImageUpload onClick={(url) => this.getPhotoUrl(url)} url={this.props.currentUser.photoUrl} currentUser={this.props.currentUser} />
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
                </ul>
              </div>
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">First Name</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="first-name" className="profile__right__list__item__data__field" defaultValue={this.props.currentUser.firstName} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Last Name</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="last-name" className="profile__right__list__item__data__field" defaultValue={this.props.currentUser.lastName} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Email</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="email" className="profile__right__list__item__data__field" defaultValue={this.props.currentUser.email} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Role</dt>
                  <dd className="profile__right__list__item__data">{this.props.currentUser.role}</dd>
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
