import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import {
  Route,
  Link
} from 'react-router-dom';

class LeagueProfileEdit extends React.Component {

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

  addTeam (e) {
    let teams = this.props.league.teams;
    let newTeam = document.getElementById("newTeam").value;
    let team = {
      name: newTeam
    };
    teams.push(team);
    this.props.handleTeamEdits(e, teams);
    $("#addForm").slideUp();
  }

  removeTeam (e) {
    e.preventDefault()
    let teams = this.props.league.teams;
    let clickedTeam = e.target.parentElement.parentElement.innerText;
    console.log(clickedTeam);
    teams.forEach(function(team, i) {
      console.log(team.name);
      if (team.name === clickedTeam) {
        teams.splice(i, 1);
      }
    });
    this.props.handleTeamEdits(e, teams);

  }

  onStatChange (e) {
    let title = document.getElementById('league-name').value;
    let createdDate = document.getElementById('league-created-date').value;
    this.props.onClick(e, title, createdDate);
  }

  toggleConfirm (e) {
    e.preventDefault();
    $("#actions").fadeOut();
    $("#delete-league").fadeIn();
  }

  menuToggle (e) {
    e.preventDefault();
    $(".js-profile-options").slideToggle();
  }

      render () {
        let league = this.props.league;

        return (
        <div className="profile__container">
          <div className="profile">
            <div className="profile__left">
              <h1 className="profile__left__title">{league.name}</h1>
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
                    <a href="" className="profile__right__links__menu__item__link" onClick={(e) => this.toggleConfirm(e)}>Delete League</a>
                  </li>
                </ul>
              </div>
              <dl className="profile__right__list">
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">League Name</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="league-name" className="profile__right__list__item__data__field" defaultValue={league.name} />
                  </dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Number of Teams</dt>
                  <dd className="profile__right__list__item__data">{league.teams.length}</dd>
                </div>
                <div className="profile__right__list__item">
                  <dt className="profile__right__list__item__title">Created</dt>
                  <dd className="profile__right__list__item__data">
                    <input id="league-created-date" className="profile__right__list__item__data__field" defaultValue={league.createdDate} />
                  </dd>
                </div>
              </dl>
                <div id="delete-league"className="panel panel__full-width modal">
                  <div className="panel__header">
                    <h1 className="panel__title">Are you sure?</h1>
                  </div>
                  <div className="panel__body">
                    <div className="panel__message-wrapper">
                      <p className="panel__message">This action will delete this league which can&#39;t be undone. Delete this league?</p>
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
                {league.teams.map((team, i) =>

                    <li className="panel__list__item">
                      <Link to={`teams/profile`} className="panel__list__item__title"><i className="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>{team.name}
                        <span className="right js-delete-team">
                          <i className="fa fa-times red" onClick={(e) => this.removeTeam(e) }></i>
                        </span>
                      </Link>
                    </li>

                )}
                  <li id="addForm" className="panel__list__item hidden">
                    <form className="panel__list__item__title" >
                      <input id="newTeam" className="panel__list__item__title__input" type="text" placeholder="Team Name"/>
                      <span className="right">
                        <i className="fa fa-check green margin-right-20" onClick={(e) => this.addTeam(e) }></i>
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

export default LeagueProfileEdit;
