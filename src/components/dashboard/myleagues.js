import React, { Component } from 'react';
import LeagueCategory from './leaguecategory.js';
import $ from 'jquery';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class MyLeagues extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        matchedLeagues: "",
        rendered: false
      };
    }

    toggleStats = (e) => {
      var el = e.target;
      $(el).next(".panel__sublist").slideToggle();
    }

    componentDidMount() {
      this.getMyLeagues();
    }

    componentDidUpdate() {
      this.getMyLeagues();
    }

    getMyLeagues() {
      if(this.state.rendered === false) {
        let currentUserLeagues;
        if (this.props.currentUser.role === "admin") {
          currentUserLeagues = this.props.stats.leagues;
        } else {
          currentUserLeagues = this.props.currentUser.userLeagues;
        }
        let matchedLeagues = [];
        if(currentUserLeagues) {
          this.props.stats.leagues.map((dataLeague) => {
            currentUserLeagues.map((userLeague) => {
              if(dataLeague.leagueId === userLeague.leagueId) {
                matchedLeagues.push(dataLeague);
              }
            });
          });
          this.setState({matchedLeagues: matchedLeagues});
          this.setState({rendered: true});
        }
      }
    }

    render() {

      if(this.state.matchedLeagues === "") {
        return (
          <ul className="panel__list">
            <li className="panel__list__item">
              <div className="panel__list__item__title">Loading...</div>
            </li>
          </ul>
        )
      } else {
        let leagueIndex;
        this.state.matchedLeagues.map((mathchedLeague) => {
          this.props.stats.leagues.map((dataLeague, i) => {
              if(dataLeague.leagueId === mathchedLeague.leagueId) {
                leagueIndex = i;
              }
          });
        });
        return (
            <ul className="panel__list">
              {/* <LeagueCategory stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)}/> */}
              {
                this.state.matchedLeagues.length !== 0 ?
                this.state.matchedLeagues.map((league,i) => {
                  let name = league.name.replace(/\s/g, '');
                  return <li className="panel__list__item" key={league.leagueId}><Link className="panel__list__item__title" to={{
                      pathname: `/leagues/profile/${name}`,
                      state: {
                        leagueIndex: leagueIndex
                      }
                    }}>{league.name}</Link></li>
                })

                : <li className="panel__list__item"><p className="panel__list__item__title">No leagues created</p></li>
              }
              {/*<li className="panel__list__item">
                <h2 className="panel__list__item__title" onClick={((e) => this.toggleStats(e))}>Top Scorers</h2>
                <ul className="panel__sublist">
                  <li className="panel__sublist__item">
                    <div className="panel__field">
                      <div className="panel__field__column column-two-thirds">
                        <p className="panel__field__stat__name"></p>
                      </div>
                      <div className="panel__field__column column-one-third">
                        <p className="panel__field__stat__value"></p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li> */}
            </ul>
        );
      }


    }
  }

MyLeagues.propTypes = {

}


export default MyLeagues;
