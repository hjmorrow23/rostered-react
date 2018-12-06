import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import LeagueProfileView from './profile-view.js';
import LeagueProfileEdit from './profile-edit.js';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class LeagueProfile extends React.Component {

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

      updateDeletedLeague(stats) {
        this.props.onStatChange(stats);
      }

      handleChangeStats (e, name, date, photoUrl) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let id;
        if(this.props.location.state) {
          id = this.props.location.state.leagueIndex;
          sessionStorage.setItem('currentLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
        } else {
          id = sessionStorage.getItem('currentLeagueId');
        }
        stats.leagues[id].name = name;
        stats.leagues[id].createdDate = date;
        stats.leagues[id].photoUrl = photoUrl;
        console.log(stats.leagues[id]);
        this.props.onStatChange(stats);
      }

      handleTeamEdits (e, teams) {
        e.preventDefault();
        // this.setState({
        //   isEditing: !this.state.isEditing
        // });
        let stats = this.props.stats;
        let id;
        if(this.props.location.state) {
          id = this.props.location.state.leagueIndex;
          sessionStorage.setItem('currentLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
        } else {
          id = sessionStorage.getItem('currentLeagueId');
        }
        stats.leagues[id].teams = teams;
        console.log(stats.leagues[id]);
        this.props.onStatChange(stats);
      }

      render () {
        // let id = this.props.location.state.leagueIndex;
        console.log();
        let id;
        if(this.props.location.state) {
          id = this.props.location.state.leagueIndex;
          sessionStorage.setItem('currentLeagueId', JSON.stringify(this.props.location.state.leagueIndex));
          console.log(id, "regular");
        } else {
          id = sessionStorage.getItem('currentLeagueId');
          console.log(id, "session");
        }
        console.log(id);
        let league = this.props.stats.leagues[id];
        console.log(league);
        let view;

        if (!this.state.isEditing) {
          view = <LeagueProfileView
            currentUser={this.props.currentUser}
            league={league}
            history={this.props.history}
            index={id}
            match={this.props.match}
            handleTeamEdits={(e, teams) => this.handleTeamEdits(e, teams)}
            onClick={(e) => this.editToggle(e)}
          />;
        } else {
          view = <LeagueProfileEdit
            currentUser={this.props.currentUser}
            stats={this.props.stats}
            league={league}
            history={this.props.history}
            match={this.props.match}
            handleTeamEdits={(e, teams) => this.handleTeamEdits(e, teams)}
            onClick={(e, name, date, photoUrl) => this.handleChangeStats(e, name, date, photoUrl)}
            onEditToggle={(e) => this.editToggle(e)}
            onDeletedLeague={(e) => this.updateDeletedLeague(e)}
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

export default withRouter(LeagueProfile);
