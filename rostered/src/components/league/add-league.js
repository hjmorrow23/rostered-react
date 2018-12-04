import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import LeagueProfile from './profile.js';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class LeagueAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: "",
      location: "",
      division: "",
      sport: "",
      age: "",
      gender: "Co-ed"
    };
  }

  updateLeagueState(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  updateLeagueGender(e) {
    let gender = document.getElementById('gender').value;
    this.setState({ gender: gender });
  }

  updateStats(e) {
    e.preventDefault();
    console.log(this.props.currentUser.userId);
    let today = new Date();
    let lid = () => {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 16)).toUpperCase();
    };
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0'+ dd;
    }

    if(mm < 10) {
        mm = '0'+ mm;
    }

    today = mm + '/' + dd + '/' + yyyy;

    let icon;

    switch(this.state.sport.toUpperCase()) {
      case "BASKETBALL":
        icon = "fa fa-basketball-ball";
        break;
      case "SOCCER":
      case "FUTBOL":
        icon = "fa fa-futbol";
        break;
      case "VOLLEYBALL":
        icon = "fa fa-volleyball-ball";
        break;
      case "TENNIS":
        icon = "fa fa-tennis-ball";
        break;
      case "GOLF":
        icon = "fa fa-golf-ball";
        break;
      case "BOWLING":
        icon = "fa fa-bowling-ball";
        break;
      case "FOOTBALL":
        icon = "fa fa-football-ball";
        break;
      case "BASEBALL":
        icon = "fa fa-baseball-ball";
        break;
      case "ARCHERY":
        icon = "fa fa-bullseye";
        break;
      case "CHEERLEADING":
        icon = "fa fa-bullhorn";
        break;
      default:
        icon = "fa fa-dot-circle";
        break;

    }

    let newLeague = {
      leagueId: lid(),
      icon: icon,
      name: this.state.leagueName,
      location: this.state.location,
      division: this.state.division,
      leagueAdmin: this.props.currentUser.userId,
      photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
      sport: this.state.sport,
      age: this.state.age,
      gender: this.state.gender,
      createdDate: today,
      teams:  [{
          name: "Sample Team",
          photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
          id: lid()
        }]
    };
    let stats = this.props.stats;
    stats.leagues.push(newLeague);
    this.props.onStatChange(stats);
    this.props.history.push("/leagues");
    // console.log(stats);
  }

  render() {
    return (
      <div className="panel">
        <div className="panel__header">
          <h1 className="panel__title">Enter League Information</h1>
        </div>
        <div className="panel__body">
          <form className="panel__form" id="addLeagueForm" onSubmit={(e) => this.updateStats(e)}>
            <fieldset>
              <label className="panel__form__field" htmlFor="leagueName">
                League Name
                <input
                  className="panel__form__field__input"
                  type="text"
                  name="leagueName"
                  placeholder="eg. FCS Youth Soccer"
                  defaultValue={this.state.leagueName}
                  onChange={(e) => this.updateLeagueState(e)}
                 />
              </label>
              <label className="panel__form__field" htmlFor="location">
                Location
                <input
                  className="panel__form__field__input"
                  type="text"
                  name="location"
                  placeholder="Flint"
                  defaultValue={this.state.location}
                  onChange={(e) => this.updateLeagueState(e)}
                 />
              </label>
              <label className="panel__form__field" htmlFor="division">
                Division
                <input
                  className="panel__form__field__input"
                  type="text"
                  name="division"
                  placeholder="eg. Michigan II"
                  defaultValue={this.state.division}
                  onChange={(e) => this.updateLeagueState(e)}
                 />
              </label>
              <label className="panel__form__field" htmlFor="sport">
                Sport
                <input
                  className="panel__form__field__input"
                  type="text"
                  name="sport"
                  placeholder="eg. Soccer"
                  defaultValue={this.state.sport}
                  onChange={(e) => this.updateLeagueState(e)}
                 />
              </label>
              <label className="panel__form__field" htmlFor="age">
                Age Range
                <input
                  className="panel__form__field__input"
                  type="text"
                  name="age"
                  placeholder="eg. 12-14"
                  defaultValue={this.state.age}
                  onChange={(e) => this.updateLeagueState(e)}
                 />
              </label>
              <label className="panel__form__field" htmlFor="gender">
                Gender
                <select
                  id="gender"
                  className="panel__form__field__input"
                  name="gender"
                  defaultValue={this.state.gender}
                  onChange={(e) => this.updateLeagueGender(e)}
                >
                  <option value="Co-ed">Co-ed</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </label>
              <input className="panel__form__submit" type="submit" value="Create League"/>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(LeagueAdd);
