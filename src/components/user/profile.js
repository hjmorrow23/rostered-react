import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import UserProfileView from './profile-view.js';
import UserProfileEdit from './profile-edit.js';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class UserProfile extends React.Component {

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

      handleChangeUserInfo (firstName, lastName, email, photoUrl) {
        this.setState({
          isEditing: !this.state.isEditing
        });
        let currentUser = {};
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = email;
        currentUser.photoUrl = photoUrl;
        console.log(currentUser);
        this.props.onUpdateUser(currentUser);
        // stats.leagues[leagueId].teams[teamId].players = players;
        // stats.leagues[leagueId].teams[teamId].players[playerId].name = name;
        // this.props.onUserInfoChange(user);
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
        let view;

        if (!this.state.isEditing) {
          view = <UserProfileView currentUser={this.props.currentUser} user={this.props.user} onClick={(e) => this.editToggle(e)} />;
        } else {
          view = <UserProfileEdit currentUser={this.props.currentUser} user={this.props.user} handleUser={(firstName, lastName, email, photoUrl) => this.handleChangeUserInfo(firstName, lastName, email, photoUrl)} onEditToggle={(e) => this.editToggle(e)}/>;
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

export default withRouter(UserProfile);
