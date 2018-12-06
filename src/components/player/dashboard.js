import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import PlayerProfile from './profile.js';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class PlayerDashboard extends React.Component {
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
          <Route exact path={`${match.path}/dashboard`} render={ () => <PlayerDashboardTable currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={this.props.match} />} />
          <Route exact path={`${match.path}/profile/:leagueid/:teamid/:playerid`} render={ ({match}) => <PlayerProfile currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={match} />} />
      </div>
    );
  }
}

class PlayerDashboardTable extends React.Component {

  render() {
    let myPlayers = [];
    console.log(this.props.currentUser);
    this.props.stats.leagues.map((league, i) => {
        let leagueName = league.name.replace(/\s/g, '');
        let leagueId = i;

        this.props.currentUser.userLeagues.map((userLeague, i) => {
          if(league.leagueId === userLeague.leagueId) {
            return league.teams.map((team, i) => {
              let teamName = team.name.replace(/\s/g, '');
              let teamId = i;

              if(team.players) {
                return team.players.map((player, i) => {
                  let playerName = player.name.replace(/\s/g, '');
                  let playerId = i;
                  myPlayers.push(player);

                });
              }
            });
          }
        });
      });

      if(myPlayers.length === 0) {
        return (
          <div className="panel panel__full-width">
            <div className="panel__header">
              <h1 className="panel__title">Players</h1>
            </div>
            <div className="panel__body">
              <ul className="panel__list">
                <li className="panel__list__item"><div className="panel__list__item__title">No Players have been added yet. Add players on a team profile page.</div></li>
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div className="panel panel__full-width">
            <div className="panel__header">
              <h1 className="panel__title">Players</h1>
            </div>
            <div className="panel__body">
              <ul className="panel__list">
              {this.props.stats.leagues.map((league, i) => {
                  let leagueName = league.name.replace(/\s/g, '');
                  let leagueId = i;

                  return league.teams.map((team, i) => {
                    let teamName = team.name.replace(/\s/g, '');
                    let teamId = i;

                    return team.players.map((player, i) => {
                      let playerName = player.name.replace(/\s/g, '');
                      let playerId = i;

                      return <li className="panel__list__item"><Link to={{
                        pathname: `${this.props.match.url}/profile/${leagueName}/${teamName}/${playerName}`,
                        state: {
                          leagueIndex: leagueId,
                          teamIndex: teamId,
                          playerIndex: playerId
                        }
                      }} className="panel__list__item__title"><i className="fa fa-futbol" aria-hidden="true"></i> {player.name}</Link></li>;

                    })

                  })

                })
              }
              </ul>
            </div>
          </div>
        );
      }
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

export default withRouter(PlayerDashboard);
