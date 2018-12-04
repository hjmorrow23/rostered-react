import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import $ from 'jquery';
import {
  Route,
  Link
} from 'react-router-dom';

class PlayerProfileView extends React.Component {

      // showAdd (e) {
      //   e.preventDefault();
      //   $("#addForm").slideDown();
      // }
      //
      // hideAdd () {
      //   $("#addForm").slideUp();
      // }
      //
      // showRemove (e) {
      //   e.preventDefault();
      //   $(".js-delete-team").fadeIn();
      // }
      //
      // addPlayer (e) {
      //   let players = this.props.team.players;
      //   let newPlayer = document.getElementById("newPlayer").value;
      //   let player = {
      //     name: newPlayer
      //   };
      //   players.push(player);
      //   this.props.handlePlayerEdits(e, players);
      //   $("#addForm").slideUp();
      // }
      //
      // removePlayer (e) {
      //   e.preventDefault()
      //   let players = this.props.team.players;
      //   let clickedPlayer = e.target.parentElement.parentElement.innerText;
      //   console.log(clickedPlayer);
      //   players.forEach(function(player, i) {
      //     console.log(player.name);
      //     if (player.name === clickedPlayer) {
      //       players.splice(i, 1);
      //     }
      //   });
      //   this.props.handlePlayerEdits(e, players);
      //
      // }

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
              <div className="profile__left__image">
                <img src={player.photoUrl} />
              </div>
            </div>
            <div className="profile__right">
              {
                this.props.currentUser.role === "admin" || this.props.currentUser.role === "league-admin" || this.props.currentUser.role === "coach" ?
                  <div className="profile__right__links">
                    <a href="" className="profile__right__links__button" onClick={(e) => this.menuToggle(e)} ><i className="fa fa-ellipsis-v"></i></a>
                    <ul className="profile__right__links__menu js-profile-options">
                      <li className="profile__right__links__menu__item">
                        <a href="" className="profile__right__links__menu__item__link" onClick={this.props.onClick}>Edit Player</a>
                      </li>
                    </ul>
                  </div>
                : ""
              }
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Player Name</dt>
                  <dd className="profile__right__list__item__data">{player.name}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Position</dt>
                  <dd className="profile__right__list__item__data">{player.position}</dd>
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

export default PlayerProfileView;
