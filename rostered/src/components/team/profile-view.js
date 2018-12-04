import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import $ from 'jquery';
import {
  Route,
  Link
} from 'react-router-dom';

class TeamProfileView extends React.Component {

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

      addPlayer (e) {
        let players = this.props.team.players;
        let newPlayer = document.getElementById("newPlayer").value;
        let player = {
          name: newPlayer
        };
        players.push(player);
        this.props.handlePlayerEdits(e, players);
        $("#addForm").slideUp();
      }

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
              <div className="profile__left__image">
                <img src={team.photoUrl} />
              </div>
            </div>
            <div className="profile__right">
              {
                this.props.currentUser.role === "admin" || this.props.currentUser.role === "league-admin" || this.props.currentUser.role === "coach" ?
                  <div className="profile__right__links">
                    <a href="" className="profile__right__links__button" onClick={(e) => this.menuToggle(e)} ><i className="fa fa-ellipsis-v"></i></a>
                    <ul className="profile__right__links__menu js-profile-options">
                      <li className="profile__right__links__menu__item">
                        <a href="" className="profile__right__links__menu__item__link" onClick={this.props.onClick}>Edit Team</a>
                      </li>
                    </ul>
                  </div>
                : ""
              }
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Team Name</dt>
                  <dd className="profile__right__list__item__data">{team.name}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Number of Players</dt>
                  <dd className="profile__right__list__item__data">{team.players.length}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Created</dt>
                  <dd className="profile__right__list__item__data">Today</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="panel panel__full-width profile__panel">
            <div className="panel__header">
              <h1 className="panel__title">Roster</h1>
            </div>
            <div className="panel__body">
              <ul className="panel__list">
              {team.players.map((player, i) => {
                let leagueName = this.props.leagueName.replace(/\s/g, '');
                let teamName = team.name.replace(/\s/g, '');
                let playerName = player.name.replace(/\s/g, '');
                let leagueId = this.props.leagueId;
                let teamId = this.props.teamId;

                return  <li className="panel__list__item">
                    <Link to={{
                      pathname: `/players/profile/${leagueName}/${teamName}/${playerName}`,
                      state: {
                        leagueIndex: leagueId,
                        teamIndex: teamId,
                        playerIndex: i
                      }
                    }} className="panel__list__item__title"><i className="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>{player.name}
                      <span className="right hidden js-delete-player">
                        <i className="fa fa-times red" onClick={(e) => this.removePlayer(e) }></i>
                      </span>
                    </Link>
                  </li>
                }

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

export default TeamProfileView;
