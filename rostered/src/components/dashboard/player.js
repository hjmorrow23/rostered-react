import React, { Component } from 'react';

class Player extends React.Component {
  render() {
      return (
        <article className="panel">
          <div className="panel__header">
            <h1 className="panel__title">Seria A Top Scorers</h1>
          </div>
          <div className="panel__body">
            <ul className="panel__list">
              {this.props.scorers.map((scorer, i) => {

                  return <li className="panel__list__item">
                    <div className="panel__field">
                      <div className="panel__field__column column-two-thirds">
                        <p className="panel__field__stat__name">{scorer.name}</p>
                      </div>
                      <div className="panel__field__column column-one-third">
                        <p className="panel__field__stat__value">{scorer.goals}</p>
                      </div>
                    </div>
                  </li>
                }
              )}
            </ul>
          </div>
        </article>
      );
  }
}

Player.propTypes = {

}

export default Player;
