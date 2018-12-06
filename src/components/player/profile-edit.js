import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import ImageUpload from '../imageUpload.js';
import {
  Route,
  Link
} from 'react-router-dom';

class PlayerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: ""
    };
  }

  showAdd (e) {
    e.preventDefault();
    $("#addForm").slideDown();
  }

  hideAdd () {
    $("#addForm").slideUp();
  }

  showRemove (e) {
    e.preventDefault();
    $(".js-delete-team").fadeIn();
  }

  getPhotoUrl(url) {
    this.setState({photoUrl: url});
  }

  // addPlayer (e) {
  //   let players = this.props.team.players;
  //   let newPlayer = document.getElementById("newPlayer").value;
  //   let leagueName = this.props.leagueName;
  //   let teamName = this.props.teamName;
  //   let name =
  //   let player = {
  //     name: newPlayer
  //   };
  //   players.push(player);
  //   this.props.handlePlayerEdits(e, players);
  //   $("#addForm").slideUp();
  //   this.props.history.push(`/players/profile/${leagueName}/${teamName}/${name}`);
  // }

  removePlayer (e) {
    e.preventDefault()
    let players = this.props.team.players;
    let clickedPlayer = e.target.parentElement.parentElement.innerText;
    console.log(clickedPlayer);
    players.forEach(function(player, i) {
      console.log(player.name);
      if (player.name === clickedPlayer) {
        players.splice(i, 1);
      }
    });
    this.props.handlePlayerEdits(e, players);
    this.props.history.push(`/players`);
  }

  onStatChange (e) {
    let title = document.getElementById('player-name').value;
    let photoUrl = this.state.photoUrl;
    this.props.onClick(e, title, photoUrl);
  }

  toggleConfirm (e) {
    e.preventDefault();
    $("#actions").fadeOut();
    $("#delete-team").fadeIn();
  }

  menuToggle (e) {
    e.preventDefault();
    $(".js-profile-options").slideToggle();
  }

      render () {
        let player = this.props.player;

        return (
        <div className="profile__container">
          <div className="profile">
            <div className="profile__left">
              <h1 className="profile__left__title">{player.name}</h1>
              <ImageUpload onClick={(url) => this.getPhotoUrl(url)} url={player.photoUrl} currentUser={this.props.currentUser} />
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
                    <input id="player-name" className="profile__right__list__item__data__field" defaultValue={player.name} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Position</dt>
                  <dd className="profile__right__list__item__data">{player.position}</dd>
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

export default PlayerProfileEdit;
