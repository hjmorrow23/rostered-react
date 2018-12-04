import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import $ from 'jquery';

class Search extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        rank: null,
        name: null,
        value: null
      };
    }

    render() {
      return (
        <div id="search-results">
            <div className="panel__body">
              <ul className="panel__list">
                {this.props.results.map((result, i) => {
                  let leagueName = result.leagueName.replace(/\s/g, '');
                    if (result.playerName !== undefined) {
                      let playerName = result.playerName.replace(/\s/g, '');
                      let teamName = result.teamName.replace(/\s/g, '');
                      return <li className="panel__list__item"><Link to={{
                        pathname: `${result.path}/profile/${leagueName}/${teamName}/${playerName}`,
                        state: {
                          leagueIndex: `${result.leagueId}`,
                          teamIndex: `${result.teamId}`,
                          playerIndex: `${result.playerId}`
                        }
                      }} className="panel__list__item__title">{result.category}: {result.name}</Link></li>
                    } else if (result.teamName !== undefined) {
                      let teamName = result.teamName.replace(/\s/g, '');
                      return <li className="panel__list__item"><Link to={{
                        pathname: `${result.path}/profile/${leagueName}/${teamName}`,
                        state: {
                          leagueIndex: result.leagueId,
                          teamIndex: result.teamId
                        }
                      }} className="panel__list__item__title">{result.category}: {result.name}</Link></li>
                    } else {
                      return <li className="panel__list__item"><Link to={{
                        pathname: `${result.path}/profile/${leagueName}`,
                        state: {
                          leagueIndex: `${result.leagueId}`
                        }
                      }} className="panel__list__item__title">{result.category}: {result.name}</Link></li>
                    }
                  })
                }
              </ul>
            </div>
        </div>
      );
    }
  }


export default withRouter(Search);
