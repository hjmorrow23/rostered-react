import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import PlayerProfileView from './profile-view.js';
import PlayerProfileEdit from './profile-edit.js';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class PlayerProfile extends React.Component {

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

      handleChangeStats (e, name, photoUrl) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let leagueId;
        let teamId;
        let playerId;

        if(this.props.location.state) {
          leagueId = this.props.location.state.leagueIndex;
          teamId = this.props.location.state.teamIndex;
          playerId = this.props.location.state.playerIndex;
          sessionStorage.setItem('currentPlayerLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          sessionStorage.setItem('currentPlayerTeamId', JSON.stringify(this.props.location.state.teamIndex));
          sessionStorage.setItem('currentPlayerId', JSON.stringify(this.props.location.state.playerIndex));
        } else {
          leagueId = sessionStorage.getItem('currentPlayerLeagueId');
          teamId = sessionStorage.getItem('currentPlayerTeamId');
          playerId = sessionStorage.getItem('currentPlayerId');
        }

        stats.leagues[leagueId].teams[teamId].players[playerId].name = name;
        stats.leagues[leagueId].teams[teamId].players[playerId].photoUrl = photoUrl;
        this.props.onStatChange(stats);
      }

      // handlePlayerEdits (e, players) {
      //   e.preventDefault();
      //   // this.setState({
      //   //   isEditing: !this.state.isEditing
      //   // });
      //   let stats = this.props.stats;
      //   let leagueId = this.props.location.state.leagueIndex;
      //   let teamId = this.props.location.state.teamIndex;
      //   stats.leagues[leagueId].teams[teamId].players = players;
      //   this.props.onStatChange(stats);
      // }

      render () {
        let leagueId;
        let teamId;
        let playerId;

        if(this.props.location.state) {
          leagueId = this.props.location.state.leagueIndex;
          teamId = this.props.location.state.teamIndex;
          playerId = this.props.location.state.playerIndex;
          sessionStorage.setItem('currentPlayerLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          sessionStorage.setItem('currentPlayerTeamId', JSON.stringify(this.props.location.state.teamIndex));
          sessionStorage.setItem('currentPlayerId', JSON.stringify(this.props.location.state.playerIndex));
        } else {
          leagueId = sessionStorage.getItem('currentPlayerLeagueId');
          teamId = sessionStorage.getItem('currentPlayerTeamId');
          playerId = sessionStorage.getItem('currentPlayerId');
        }

        console.log(this.props.stats.leagues);
        let player = this.props.stats.leagues[leagueId].teams[teamId].players[playerId];
        let leagueName = this.props.stats.leagues[leagueId].name;
        let teamName = this.props.stats.leagues[leagueId].teams[teamId];
        let view;

        if (!this.state.isEditing) {
          view = <PlayerProfileView
            currentUser={this.props.currentUser}
            player={player}
            leagueName={leagueName}
            teamName={teamName}
            history={this.props.history}
            match={this.props.match}
            onClick={(e) => this.editToggle(e)}
          />;
        } else {
          view = <PlayerProfileEdit
            currentUser={this.props.currentUser}
            player={player}
            leagueName={leagueName}
            teamName={teamName}
            history={this.props.history}
            match={this.props.match}
            onClick={(e, name, photoUrl) => this.handleChangeStats(e, name, photoUrl)}
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

export default withRouter(PlayerProfile);
