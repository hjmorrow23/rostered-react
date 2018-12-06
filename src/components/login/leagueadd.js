import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter,
  Route,
  Link,
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
      gender: "Co-ed",
      password1: "",
      password2: "",
      stats: "",
      leagueName:"",
      leagueId: ""
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
      leagueAdmin: "",
      photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
      sport: this.state.sport,
      age: this.state.age,
      gender: this.state.gender,
      createdDate: today,
      teams:  [{
          name: "Sample Team",
          id: lid(),
          photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
          coach: {
            name: "",
            id: ""
          },
          players: [],
        }]
    };
    let stats = this.props.stats;
    console.log(stats);
    if(this.state.password1 !== "" && this.state.password2 !== "" && this.state.password1 === this.state.password2) {
      console.log(stats.leagues);
      stats.leagues.push(newLeague);
      this.setState({stats: stats});
      console.log(this.state.stats);
      this.props.handleSignup(this.state.password2, true, stats, newLeague.name, newLeague.leagueId, null, null, null, null);
      this.props.history.push('/home');
    } else {
      alert("Passwords don't match");
    }
  }

  render() {
    return (
      <div className="login__modal signup-modal">
        <h1 className="login__modal__header">Enter League Information</h1>
        <form className="login__form" id="addLeagueForm" onSubmit={(e) => this.updateStats(e)}>
          <fieldset>
            <label className="login__form__field" htmlFor="leagueName">
              League Name
              <input
                className="login__form__field__input"
                type="text"
                name="leagueName"
                placeholder="eg. FCS Youth Soccer"
                defaultValue={this.state.leagueName}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="location">
              Location
              <input
                className="login__form__field__input"
                type="text"
                name="location"
                placeholder="Flint"
                defaultValue={this.state.location}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="division">
              Division
              <input
                className="login__form__field__input"
                type="text"
                name="division"
                placeholder="eg. Michigan II"
                defaultValue={this.state.division}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="sport">
              Sport
              <input
                className="login__form__field__input"
                type="text"
                name="sport"
                placeholder="eg. Soccer"
                defaultValue={this.state.sport}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="age">
              Age Range
              <input
                className="login__form__field__input"
                type="text"
                name="age"
                placeholder="eg. 12-14"
                defaultValue={this.state.age}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="gender">
              Gender
              <select
                id="gender"
                className="login__form__field__input"
                name="gender"
                defaultValue={this.state.gender}
                onChange={(e) => this.updateLeagueGender(e)}
              >
                <option value="Co-ed">Co-ed</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </label>
            <label className="login__form__field" htmlFor="password1">
              Create Password
              <input
                className="login__form__field__input"
                type="password"
                name="password1"
                defaultValue={this.state.password1}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <label className="login__form__field" htmlFor="password2">
              Re-Type Password
              <input
                className="login__form__field__input"
                type="password"
                name="password2"
                defaultValue={this.state.password2}
                onChange={(e) => this.updateLeagueState(e)}
               />
            </label>
            <input className="login__form__submit" type="submit" value="Create League"/>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(LeagueAdd);
