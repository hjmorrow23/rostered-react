import React, { Component } from 'react';
import $ from 'jquery';
import LeagueStatEditing from './leaguestatediting.js';
import LeagueStatStatic from './leaguestatstatic.js';
import PropTypes from 'prop-types';

class LeagueStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  editToggle () {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  editToggleUpdate (rank, name, record) {
    this.setState({
      isEditing: !this.state.isEditing
    });
    this.props.handleChangeStats( rank, name, record);
  }

  render() {
    let field;

    if (!this.state.isEditing) {
      field = <LeagueStatStatic
        rank={this.props.rank}
        name={this.props.name}
        record={this.props.record}
        onClick={(rank) => this.editToggle() }
      />
    } else {
      field = <LeagueStatEditing
        rank={this.props.rank}
        name={this.props.name}
        record={this.props.record}
        onClick={(rank, name, record) => {this.editToggleUpdate(rank, name, record)} }
      />
    }

    return (
      <div className="panel__field">
          {field}
      </div>
    );
  }
}

// LeagueStat.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default LeagueStat;
