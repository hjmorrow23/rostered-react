import React, { Component } from 'react';
import $ from 'jquery';
import MyLeagues from './dashboard/myleagues';
import LeagueStandings from './dashboard/leaguestandings';

class Panel extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        title: this.props.title
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
            <h1 className="panel__title">{this.props.title}</h1>
          </div>
          <div className="panel__body">
            {this.props.child}
          </div>
        </article>
      );
    }
  }

Panel.propTypes = {

}


export default Panel;
