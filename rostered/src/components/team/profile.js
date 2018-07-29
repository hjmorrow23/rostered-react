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

      handleChangeStats (e, name, players) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let leagueId = this.props.location.state.leagueIndex;
        let teamId = this.props.location.state.teamIndex;
        // stats.leagues[leagueId].teams[teamId].players = players;
        stats.leagues[leagueId].teams[teamId].name = name;
        this.props.onStatChange(stats);
      }

      handlePlayerEdits (e, players) {
        e.preventDefault();
        // this.setState({
        //   isEditing: !this.state.isEditing
        // });
        let stats = this.props.stats;
        let leagueId = this.props.location.state.leagueIndex;
        let teamId = this.props.location.state.teamIndex;
        stats.leagues[leagueId].teams[teamId].players = players;
        this.props.onStatChange(stats);
      }

      render () {
        let leagueId = this.props.location.state.leagueIndex;
        let teamId = this.props.location.state.teamIndex;
        console.log(this.props.stats.leagues);
        let leagueName = this.props.stats.leagues[leagueId].name;
        let team = this.props.stats.leagues[leagueId].teams[teamId];
        let view;

        if (!this.state.isEditing) {
          view = <TeamProfileView leagueId={leagueId} teamId={teamId} leagueName={leagueName} team={team} handlePlayerEdits={(e, players) => this.handlePlayerEdits(e, players)} onClick={(e) => this.editToggle(e)} />;
        } else {
          view = <TeamProfileEdit team={team} handlePlayerEdits={(e, players) => this.handlePlayerEdits(e, players)} onClick={(e, name, players) => this.handleChangeStats(e, name, players)} onEditToggle={(e) => this.editToggle(e)}/>;
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
