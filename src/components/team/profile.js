import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import TeamProfileView from './profile-view.js';
import TeamProfileEdit from './profile-edit.js';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class TeamProfile extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isEditing: false
      };
    }

      editToggle = (e) => {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
      }

      handleChangeStats (e, name, photoUrl, players) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let leagueId;
        let teamId;
        if(this.props.location.state) {
          leagueId = this.props.location.state.leagueIndex;
          teamId = this.props.location.state.teamIndex;
          sessionStorage.setItem('currentTeamLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          sessionStorage.setItem('currentTeamId', JSON.stringify(this.props.location.state.teamIndex));
        } else {
          leagueId = sessionStorage.getItem('currentTeamLeagueId');
          teamId = sessionStorage.getItem('currentTeamId');
        }
        stats.leagues[leagueId].teams[teamId].name = name;
        stats.leagues[leagueId].teams[teamId].photoUrl = photoUrl;
        this.props.onStatChange(stats);
      }

      handlePlayerEdits (e, players) {
        e.preventDefault();
        let stats = this.props.stats;
        let leagueId;
        let teamId;
        if(this.props.location.state) {
          leagueId = this.props.location.state.leagueIndex;
          teamId = this.props.location.state.teamIndex;
          sessionStorage.setItem('currentTeamLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          sessionStorage.setItem('currentTeamId', JSON.stringify(this.props.location.state.teamIndex));
        } else {
          leagueId = sessionStorage.getItem('currentTeamLeagueId');
          teamId = sessionStorage.getItem('currentTeamId');
        }
        stats.leagues[leagueId].teams[teamId].players = players;
        this.props.onStatChange(stats);
      }

      render () {
        let leagueId;
        let teamId;
        if(this.props.location.state) {
          leagueId = this.props.location.state.leagueIndex;
          teamId = this.props.location.state.teamIndex;
          sessionStorage.setItem('currentTeamLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          sessionStorage.setItem('currentTeamId', JSON.stringify(this.props.location.state.teamIndex));
        } else {
          leagueId = sessionStorage.getItem('currentTeamLeagueId');
          teamId = sessionStorage.getItem('currentTeamId');
        }

        console.log(this.props.stats.leagues);
        let leagueName = this.props.stats.leagues[leagueId].name;
        let team = this.props.stats.leagues[leagueId].teams[teamId];
        let view;

        if (!this.state.isEditing) {
          view = <TeamProfileView
            currentUser={this.props.currentUser}
            leagueId={leagueId}
            teamId={teamId}
            history={this.props.history}
            match={this.props.match}
            leagueName={leagueName}
            team={team}
            handlePlayerEdits={(e, players) => this.handlePlayerEdits(e, players)}
            onClick={(e) => this.editToggle(e)}
          />;
        } else {
          view = <TeamProfileEdit
            currentUser={this.props.currentUser}
            team={team}
            leagueName={leagueName}
            history={this.props.history}
            match={this.props.match}
            handlePlayerEdits={(e, players) => this.handlePlayerEdits(e, players)}
            onClick={(e, name, photoUrl, players) => this.handleChangeStats(e, name, photoUrl, players)}
            onEditToggle={(e) => this.editToggle(e)}
          />;
        }

        return (
            <div className="profile__container">
              {view}
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

export default withRouter(TeamProfile);
