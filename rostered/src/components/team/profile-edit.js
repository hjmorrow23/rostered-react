import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import ImageUpload from '../imageUpload.js';
import {
  Route,
  Link
} from 'react-router-dom';

class TeamProfileEdit extends React.Component {
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

  addPlayer (e) {
    let players = this.props.team.players;
    let newPlayer = document.getElementById("newPlayer").value;
    let name = this.props.team.name.replace(/\s/g, '');
    let leagueName = this.props.leagueName;
    let player = {
      name: newPlayer,
      score: "",
      photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
    };
    players.push(player);
    this.props.handlePlayerEdits(e, players);
    $("#addForm").slideUp();
    this.props.history.push(`/teams/profile/${leagueName}/${name}`);
  }

  removePlayer (e) {
    e.preventDefault()
    let players = this.props.team.players;
    let clickedPlayer = e.target.parentElement.parentElement.innerText;
    let leagueName = this.props.leagueName;
    let name = this.props.team.name.replace(/\s/g, '');
    console.log(clickedPlayer);
    players.forEach(function(player, i) {
      console.log(player.name);
      if (player.name === clickedPlayer) {
        players.splice(i, 1);
      }
    });
    this.props.handlePlayerEdits(e, players);
    this.props.history.push(`/teams/profile/${leagueName}/${name}`);
  }

  onStatChange (e) {
    let title = document.getElementById('team-name').value;
    let createdDate = document.getElementById('team-created-date').value;
    let leagueName = this.props.leagueName;
    let urlTitle = title.replace(/\s/g, '');
    let photoUrl = this.state.photoUrl;
    this.props.onClick(e, title, photoUrl);
    this.props.history.push(`/teams/profile/${leagueName}/${urlTitle}`);
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
        let team = this.props.team;

        return (
        <div className="profile__container">
          <div className="profile">
            <div className="profile__left">
              <h1 className="profile__left__title">{team.name}</h1>
              <ImageUpload onClick={(url) => this.getPhotoUrl(url)} url={team.photoUrl} currentUser={this.props.currentUser} />
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
                    <input id="team-name" className="profile__right__list__item__data__field" defaultValue={team.name} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Number of Players</dt>
                  <dd className="profile__right__list__item__data">{team.players.length}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Created</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="team-created-date" className="profile__right__list__item__data__field" defaultValue="today" />
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
            <div className="panel panel__full-width profile__panel">
              <div className="panel__header">
                <h1 className="panel__title">Standings</h1>
                <i className="fa fa-plus panel__header__add" onClick={(e) => this.showAdd(e) } ></i>
              </div>
              <div className="panel__body">
                <ul className="panel__list">
                {team.players.map((player, i) =>

                    <li className="panel__list__item">
                      <Link to={`players/profile`} className="panel__list__item__title"><i className="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>{player.name}
                        <span className="right js-delete-team">
                          <i className="fa fa-times red" onClick={(e) => this.removePlayer(e) }></i>
                        </span>
                      </Link>
                    </li>

                )}
                  <li id="addForm" className="panel__list__item hidden">
                    <form className="panel__list__item__title" >
                      <input id="newPlayer" className="panel__list__item__title__input" type="text" placeholder="Player Name"/>
                      <span className="right">
                        <i className="fa fa-check green margin-right-20" onClick={(e) => this.addPlayer(e) }></i>
                        <i className="fa fa-times red" onClick={(e) => this.hideAdd(e) }></i>
                      </span>
                    </form>
                  </li>
                </ul>
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

export default TeamProfileEdit;
