import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Header from '../header.js';
import ImageUpload from '../imageUpload.js';
import {
  Route,
  Link
} from 'react-router-dom';

class LeagueProfileEdit extends React.Component {
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

  hideRemove (e) {
    e.preventDefault();
    $("#delete-league").fadeOut();
  }

  deleteLeague(e) {
    // e.preventDefault();
    let stats = this.props.stats;
    let newStats = [];
    stats.leagues.map((league, index) => {
      if(league.name !== this.props.league.name) {
        newStats.push(league);
      }
    });
    stats.leagues = newStats;
    this.props.history.push('/leagues');
    this.props.onDeletedLeague(stats);
  }

  addTeam (e) {
    let teams = this.props.league.teams;
    let lid = () => {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 16)).toUpperCase();
    };
    let name = this.props.league.name.replace(/\s/g, '');
    let newTeam = document.getElementById("newTeam").value;
    let team = {
      name: newTeam,
      photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
      id: lid(),
      players: [{
        name: "Sample Player",
        photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
        id: lid()
      }]
    };
    teams.push(team);
    this.props.handleTeamEdits(e, teams);
    $("#addForm").slideUp();
    this.props.history.push(`/leagues/profile/${name}`);
  }

  removeTeam (e) {
    e.preventDefault()
    let teams = this.props.league.teams;
    let clickedTeam = e.target.parentElement.parentElement.innerText;
    let name = this.props.league.name.replace(/\s/g, '');
    console.log(clickedTeam);
    teams.forEach(function(team, i) {
      console.log(team.name);
      if (team.name === clickedTeam) {
        teams.splice(i, 1);
      }
    });
    this.props.handleTeamEdits(e, teams);
    this.props.history.push(`/leagues/profile/${name}`);

  }

  getPhotoUrl(url) {
    this.setState({photoUrl: url});
  }

  onStatChange (e) {
    let title = document.getElementById('league-name').value;
    let urlTitle = title.replace(/\s/g, '');
    let createdDate = document.getElementById('league-created-date').value;
    let photoUrl = this.state.photoUrl;
    this.props.onClick(e, title, createdDate, photoUrl);
    this.props.history.push(`${urlTitle}`);
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
              <ImageUpload onClick={(url) => this.getPhotoUrl(url)} url={league.photoUrl} currentUser={this.props.currentUser} />
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
                        <a href="" onClick={(e) => this.deleteLeague(e)} className="panel__actions__link">Yes</a>
                        <a href="" onClick={(e) => this.hideRemove(e)} className="panel__actions__link">No</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="panel panel__full-width profile__panel">
              <div className="panel__header">
                <h1 className="panel__title">Teams</h1>
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
