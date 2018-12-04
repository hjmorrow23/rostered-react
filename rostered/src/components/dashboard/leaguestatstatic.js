import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class LeagueStatStatic extends React.Component {

  render() {
    return (
      <div className="panel__field__stats">
        <span className="panel__field__stat panel__field__stat__rank">{this.props.rank}</span>
        <p className="panel__field__stat panel__field__stat__name">{this.props.name}</p>
        <p className="panel__field__stat panel__field__stat__value">{this.props.record}</p>
        <div className="panel__field__links">
          <i className="fa fa-edit" aria-hidden="true" onClick={() => this.props.onClick()}></i>
        </div>
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

export default LeagueStatStatic;
