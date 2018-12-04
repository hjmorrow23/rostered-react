import React, { Component } from 'react';
import $ from 'jquery';

class Team extends React.Component {
  render() {
      return (
        <article className="panel">
          <div className="panel__header">
            <h1 className="panel__title">Team Stats</h1>
          </div>
          <div className="panel__body">
            <ul className="panel__list">
              <li className="panel__list__item">
              <div className="panel__field">
                <div className="panel__field__column column-two-thirds">
                  <input className="panel__field__input" type="text" />
                </div>
                <div className="panel__field__column column-one-third">
                  <input className="panel__field__input" type="text" />
                </div>
              </div>
              </li>
            </ul>
          </div>
        </article>
      );
  }
}

Team.propTypes = {

}

export default Team;
