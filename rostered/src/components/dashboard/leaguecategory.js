import React, { Component } from 'react';
import LeagueStat from './leaguestat.js';
import $ from 'jquery';

class LeagueCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // stats: [
      //   {
      //     rank: 1,
      //     name: 'Wombats',
      //     value: '6-1'
      //   },
      //   {
      //     rank: 2,
      //     name: 'Cavaliers',
      //     value: '5-2'
      //   },
      //   {
      //     rank: 3,
      //     name: 'Hornets',
      //     value: '4-3'
      //   }
      // ],
      // isEditing: false
    };
  }

  // editToggle () {
  //   this.setState({
  //     isEditing: !this.state.isEditing
  //   });
  // }

  handleChangeStats (i, rank, name, record) {
    var stats = this.props.stats;
    stats.leagues[0].teams[i].rank = rank;
    stats.leagues[0].teams[i].name = name;
    stats.leagues[0].teams[i].record = record;
    console.log(stats);
    this.props.onStatChange(stats);
  }

  toggleStats = (e) => {
    var el = e.target;
    $(el).next(".panel__sublist").slideToggle();
  }

  render() {

    // var teams = this.props.stats.leagues[0].teams;

    return (
      <li className="panel__list__item">
        <h2 className="panel__list__item__title" onClick={((e) => this.toggleStats(e))}>Standings</h2>
        <ul className="panel__sublist">
          <li className="panel__sublist__item">
            <div className="panel__list__item__header">
              <span className="panel__list__item__header--rank">Rank</span>
              <span className="panel__list__item__header--team">Team</span>
              <span className="panel__list__item__header--record">Record</span>
            </div>

            {this.props.stats.leagues[0].teams.map((stat, i) => <LeagueStat
              rank={stat.rank}
              name={stat.name}
              record={stat.record}
              handleChangeStats={(rank, name, record) => {this.handleChangeStats(i, rank, name, record)} }

            />)}
          </li>
        </ul>
      </li>
    );
  }
}

LeagueCategory.propTypes = {

}

export default LeagueCategory;
