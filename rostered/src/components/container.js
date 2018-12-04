import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header.js'
import Dashboard from './dashboard/dashboard.js';
import LeagueDashboard from './league/dashboard.js';
import LeagueProfile from './league/profile.js';
import TeamDashboard from './team/dashboard.js';
import PlayerDashboard from './player/dashboard.js';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

class Container extends React.Component {

  render() {
    return (
      <div className="container">
        <Route exact path="/home" render={() => <Dashboard stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} />} />
        <Route exact path="/leagues" render={() => <LeagueDashboard stats={this.props.stats} match={this.state.match} onStatChange={(stats) => this.props.onStatChange(stats)} />} />
        <Route exact path="/teams" render={() => <TeamDashboard stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} />} />
        <Route exact path="/players" render={() => <PlayerDashboard stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} />} />
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

export default Container;
