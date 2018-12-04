import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import LeagueProfile from './profile.js';
import LeagueAdd from './add-league.js';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class LeagueDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    var match = this.props.match;

    return (
      <div>
          <Route exact path={match.path} render={ () => <Redirect to={`${match.path}/dashboard`} />} />
          <Route exact path={`${match.path}/dashboard`} render={ () => <LeagueDashboardTable currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={this.props.match} />} />
          <Route exact path={`${match.path}/profile/:leagueid`} render={ ({match}) => <LeagueProfile currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={match} />} />
          <Route exact path={`${match.path}/add`} render={ ({match}) => <LeagueAdd currentUser={this.props.currentUser} stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)} match={match} />} />
      </div>
    );
  }
}

class LeagueDashboardTable extends React.Component {

  render() {
    let myLeagues = [];
    if (this.props.currentUser.role === "coach" || this.props.currentUser.role === "player") {
      this.props.currentUser.userLeagues.map((userLeague, i) => {
        this.props.stats.leagues.map((league,i) => {
          if (userLeague.leagueId === league.leagueId) {
            myLeagues.push(league);
          }
        })
      })
    }
    console.log(myLeagues);

    return (
      <div className="panel panel__full-width">
        <div className="panel__header">
          <h1 className="panel__title">My Leagues <Link to={{
              pathname: `${this.props.match.url}/add`,
            }} className="panel-link"><i className="fa fa-plus panel__header__add"></i></Link></h1>
        </div>
        <div className="panel__body">
          <ul className="panel__list">
          {
            //Admin view all leagues
            this.props.currentUser.role === "admin" || this.props.currentUser.role === "league-admin" ?
              this.props.stats.leagues.map((league, i) => {
                let name = league.name.replace(/\s/g, '');
                return <li className="panel__list__item"><Link to={{
                  pathname: `${this.props.match.url}/profile/${name}`,
                  state: {
                    leagueIndex: i
                  }
                }} className="panel__list__item__title"><i className={league.icon} aria-hidden="true"></i> {league.name}</Link></li>;
              })
            : myLeagues.length === 0 ?
                <li className="panel__list__item"><div className="panel__list__item__title">You don't have any leagues yet. Hit the plus icon on the top right to create one.</div></li>
                : myLeagues.map((league, i) => {
                  let name = league.name.replace(/\s/g, '');
                  return <li className="panel__list__item"><Link to={{
                    pathname: `${this.props.match.url}/profile/${name}`,
                    state: {
                      leagueIndex: i
                    }
                  }} className="panel__list__item__title"><i className={league.icon} aria-hidden="true"></i> {league.name}</Link></li>;
                })

          }
          </ul>
        </div>
      </div>
    );
  }
}

// const LeagueProfileLink = ({match}) => {
//
//     return (
//
//     );
// }



// LeagueStatStatic.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default withRouter(LeagueDashboard);
