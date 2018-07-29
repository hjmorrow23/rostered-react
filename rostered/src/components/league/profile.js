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

      handleChangeStats (e, name, date) {
        e.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
        let stats = this.props.stats;
        let id = this.props.location.state.leagueIndex;
        stats.leagues[id].name = name;
        stats.leagues[id].createdDate = date;
        console.log(stats.leagues[id]);
        this.props.onStatChange(stats);
      }

      handleTeamEdits (e, teams) {
        e.preventDefault();
        // this.setState({
        //   isEditing: !this.state.isEditing
        // });
        let stats = this.props.stats;
        let id = this.props.location.state.leagueIndex;
        stats.leagues[id].teams = teams;
        console.log(stats.leagues[id]);
        this.props.onStatChange(stats);
      }

      render () {
        let id = this.props.location.state.leagueIndex;
        console.log(this.props.location);
        let league = this.props.stats.leagues[id];
        let view;

        if (!this.state.isEditing) {
          view = <LeagueProfileView league={league} index={id} match={this.props.match} handleTeamEdits={(e, teams) => this.handleTeamEdits(e, teams)} onClick={(e) => this.editToggle(e)} />;
        } else {
          view = <LeagueProfileEdit league={league} handleTeamEdits={(e, teams) => this.handleTeamEdits(e, teams)} onClick={(e, name, date) => this.handleChangeStats(e, name, date)} onEditToggle={(e) => this.editToggle(e)}/>;
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
