import React, { Component } from 'react';
import LeagueCategory from './leaguecategory.js';
import $ from 'jquery';

class League extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        rank: null,
        name: null,
        value: null
      };
    }

    toggleStats = (e) => {
      var el = e.target;
      $(el).next(".panel__sublist").slideToggle();
    }

    render() {

      return (
        <article className="panel">
          <div className="panel__header">
            <h1 className="panel__title">League Stats</h1>
          </div>
          <div className="panel__body">
            <ul className="panel__list">
              <LeagueCategory stats={this.props.stats} onStatChange={(stats) => this.props.onStatChange(stats)}/>
              <li className="panel__list__item">
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
              </li>
            </ul>
          </div>
        </article>
      );
    }
  }

League.propTypes = {

}


export default League;
