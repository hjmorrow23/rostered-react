import React, { Component } from 'react';
import LeagueCategory from './leaguecategory.js';
import $ from 'jquery';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class LeagueStandings extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        matchedLeagues: "",
        teams: "",
        rendered: false
      };
    }

    toggleStats = (e) => {
      var el = e.target;
      $(el).next(".panel__sublist").slideToggle();
    }

    componentDidMount() {
      this.getMyLeagues();
    }

    componentDidUpdate() {
      this.getMyLeagues();
    }

    getMyLeagues() {
      if(this.state.rendered === false) {
        let currentUserLeagues;
        if (this.props.currentUser.role === "admin") {
          currentUserLeagues = this.props.stats.leagues;
        } else {
          currentUserLeagues = this.props.currentUser.userLeagues;
        }
        let matchedLeagues = [];
        if(currentUserLeagues) {
          this.props.stats.leagues.map((dataLeague) => {
            currentUserLeagues.map((userLeague) => {
              if(dataLeague.leagueId === userLeague.leagueId) {
                matchedLeagues.push(dataLeague);
              }
            });
          });
          let teams = matchedLeagues[0].teams;
          teams.map((team, i) => {
            team.originalIndex = i;
          });
          this.setState({matchedLeagues: matchedLeagues});
          this.setState({teams: teams});
          this.setState({rendered: true});
        }
      }
    }

    render() {

      if(this.state.teams === "") {
        return (
          <ul className="panel__list">
            <li className="panel__list__item">
              <div className="panel__list__item__title">Loading...</div>
            </li>
          </ul>
        )
      } else {
        let leagueIndex;
        this.state.matchedLeagues.map((mathchedLeague) => {
          this.props.stats.leagues.map((dataLeague, i) => {
              if(dataLeague.leagueId === mathchedLeague.leagueId) {
                leagueIndex = i;
              }
          });
        });
        let leagueName = this.state.matchedLeagues[0].name.replace(/\s/g, '');

        let sortedTeams = this.state.teams.sort((a, b) => {
          return a.rank - b.rank;
        });

        return (
            <ul className="panel__list">
              {/* <LeagueCategory stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)}/> */}
              {
                this.state.teams.length !== 0 ?
                  sortedTeams.map((team, i) => {
                    let teamName = team.name.replace(/\s/g, '');
                    return <li className="panel__list__item" key={team.id}><Link className="panel__list__item__title" to={{
                        pathname: `/teams/profile/${leagueName}/${teamName}`,
                        state: {
                          leagueIndex: leagueIndex,
                          teamIndex: team.originalIndex
                        }
                      }}>{team.rank}.  {team.name}</Link></li>
                  })
                : <li className="panel__list__item"><p className="panel__list__item__title">No teams tracked</p></li>
              }
              {/*<li className="panel__list__item">
                <h2 className="panel__list__item__title" onClick={((e) => this.toggleStats(e))}>Top Scorers</h2>
                <ul className="panel__sublist">
                  <li className="panel__sublist__item">
                    <div className="panel__field">
                      <div className="panel__field__column column-two-thirds">
                        <p className="panel__field__stat__name"></p>
                      </div>
                      <div className="panel__field__column column-one-third">
                        <p className="panel__field__stat__value"></p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li> */}
            </ul>
        );
      }


    }
  }


export default LeagueStandings;
