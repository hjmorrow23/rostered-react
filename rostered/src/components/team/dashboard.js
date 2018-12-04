import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import TeamProfile from './profile.js';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class TeamDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    var match = this.props.match;

    return (
      <div>
          <Route exact path={match.path} render={ () => <Redirect to={`${match.path}/dashboard`} />} />
          <Route exact path={`${match.path}/dashboard`} render={ () => <TeamDashboardTable currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={this.props.match} />} />
          <Route exact path={`${match.path}/profile/:leagueid/:teamid`} render={ ({match}) => <TeamProfile currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={match} />} />
      </div>
    );
  }
}

class TeamDashboardTable extends React.Component {

  render() {
    let myTeams = [];
    if (this.props.currentUser.role === "coach" || this.props.currentUser.role === "player") {
      if(this.props.currentUser.userTeams) {
        this.props.currentUser.userTeams.map((userTeam, i) => {
          this.props.stats.leagues.map((league,i) => {
            league.teams.map((team, i) => {
              if (userTeam.leagueId === team.teamId) {
                myTeams.push(team);
              }
            });
          })
        })
      }
    }

    return (
      <div className="panel panel__full-width">
        <div className="panel__header">
          <h1 className="panel__title">Teams</h1>
        </div>
        <div className="panel__body">
          <ul className="panel__list">
          {
            this.props.currentUser.role === "admin" || this.props.currentUser.role === "league-admin"?
              this.props.stats.leagues.map((league, i) => {
                let leagueName = league.name.replace(/\s/g, '');
                let leagueId = i;

                return league.teams.map((team, i) => {
                  let teamName = team.name.replace(/\s/g, '');
                  let teamId = i;

                  return <li className="panel__list__item"><Link to={{
                    pathname: `${this.props.match.url}/profile/${leagueName}/${teamName}`,
                    state: {
                      leagueIndex: leagueId,
                      teamIndex: teamId
                    }
                  }} className="panel__list__item__title"><i className="fa fa-futbol" aria-hidden="true"></i> {team.name}</Link></li>;
                })

              })
            : myTeams.length === 0 ?
              <li className="panel__list__item"><div className="panel__list__item__title">No Teams have been added yet. Add teams by going to league profile page and editing the league.</div></li>
              : this.props.stats.leagues.map((league, i) => {
                let leagueName = league.name.replace(/\s/g, '');
                let leagueId = i;

                myTeams.map((team, i) => {
                  let teamName = team.name.replace(/\s/g, '');
                  let teamId = i;

                  return <li className="panel__list__item"><Link to={{
                    pathname: `${this.props.match.url}/profile/${leagueName}/${teamName}`,
                    state: {
                      leagueIndex: leagueId,
                      teamIndex: teamId
                    }
                  }} className="panel__list__item__title"><i className="fa fa-futbol" aria-hidden="true"></i> {team.name}</Link></li>;
                })
              })
          }
          </ul>
        </div>
      </div>
    );
  }
}

// const LeagueProfileLink = ({match}) => {
//
//     return (
//
//     );
// }



// LeagueStatStatic.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default withRouter(TeamDashboard);
