import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Header from '../header.js';
import League from './league.js';
import Team from './team.js';
import Player from './player.js';
import Search from  '../search.js';
import Panel from '../panel.js';
import MyLeagues from './myleagues.js';
import LeagueStandings from './leaguestandings.js';
import TopPlayers from './topplayers.js';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import $ from 'jquery';

class Dashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        rank: null,
        name: null,
        value: null,
        results: [],
        title: ""
      };
    }

    toggleStats = (e) => {
      var el = e.target;
      $(el).next(".panel__sublist").slideToggle();
    }

    getPanelHeader(title) {
      this.setState({title: title});
    }

    searchData(e) {
      e.preventDefault();
      let results = [];
      let leagues = this.props.stats.leagues;
      let toTitleCase = function(str) {
          return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      function getSearchValue() {
      	var searchValue = document.querySelector(".search__input").value;
      	searchValue = searchValue.toLowerCase();
      	return searchValue;
      }

      let inputVal = getSearchValue();

      leagues.map((league, i) => {
        let leagueIndex = i;
        if (league.name.toLowerCase().indexOf(inputVal) > -1) {
          results.push(
            {
              path: "leagues",
              category: "League",
              name: league.name,
              leagueName: league.name,
              leagueId: leagueIndex
            }
          );
        }

        league.teams.map((team, i) => {
          let teamIndex = i;
          if (team.name.toLowerCase().indexOf(inputVal) > -1) {
            results.push(
              {
                path: "teams",
                category: "Team",
                name: team.name,
                teamName: team.name,
                teamId: teamIndex,
                leagueName: league.name,
                leagueId: leagueIndex
              }
            );
          }

          team.players.map((player, i) => {
            let playerIndex = i;
            if (player.name.toLowerCase().indexOf(inputVal) > -1) {
              results.push(
                {
                  path: "players",
                  category: "Player",
                  name: player.name,
                  playerName: player.name,
                  playerId: playerIndex,
                  teamName: team.name,
                  teamId: teamIndex,
                  leagueName: league.name,
                  leagueId: leagueIndex
                }
              );
            }
          });

        });

      });

      this.setState({
        results: results
      });


      $("#search-results").show();

    }

    render() {
      return (
        <div>
            <h1 className="content__header">Dashboard</h1>
            <Panel title={"My Leagues"} stats={this.props.stats} currentUser={this.props.currentUser} child={<MyLeagues currentUser={this.props.currentUser} stats={this.props.stats} setTitle={() => this.getPanelHeader()} />} />
            <Panel title={"Primary League Standings"} stats={this.props.stats} currentUser={this.props.currentUser} child={<LeagueStandings currentUser={this.props.currentUser} stats={this.props.stats} setTitle={() => this.getPanelHeader()} />} />
            <Panel title={"Top Players"} stats={this.props.stats} currentUser={this.props.currentUser} child={<TopPlayers currentUser={this.props.currentUser} stats={this.props.stats} setTitle={() => this.getPanelHeader()} />} />
        </div>
      );
    }
  }

Dashboard.propTypes = {

}


export default withRouter(Dashboard);

export { Dashboard };
