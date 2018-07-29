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

      handleChangeStats (e, name) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let leagueId = this.props.location.state.leagueIndex;
        let teamId = this.props.location.state.teamIndex;
        let playerId = this.props.location.state.playerIndex;
        // stats.leagues[leagueId].teams[teamId].players = players;
        stats.leagues[leagueId].teams[teamId].players[playerId].name = name;
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
        let leagueId = this.props.location.state.leagueIndex;
        let teamId = this.props.location.state.teamIndex;
        let playerId = this.props.location.state.playerIndex;
        console.log(this.props.stats.leagues);
        let player = this.props.stats.leagues[leagueId].teams[teamId].players[playerId];
        let view;

        if (!this.state.isEditing) {
          view = <PlayerProfileView player={player} onClick={(e) => this.editToggle(e)} />;
        } else {
          view = <PlayerProfileEdit player={player} onClick={(e, name) => this.handleChangeStats(e, name)} onEditToggle={(e) => this.editToggle(e)}/>;
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
