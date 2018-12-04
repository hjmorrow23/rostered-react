import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class LeagueStatEditing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: this.props.rank,
      name: this.props.name,
      record: this.props.record
    };
  }

  onRankEdit (e) {
    this.setState({rank: e.target.value});
  }

  onNameEdit (e) {
    this.setState({name: e.target.value});
  }

  onRecordEdit (e) {
    this.setState({record: e.target.value});
  }
  //
  onStatChange (e) {
    this.props.onClick(this.state.rank, this.state.name, this.state.record);
  }
  //
  // onNameChange (e) {
  //   this.setState({name:e.target.value});
  // }
  //
  // onRecordChange (e) {
  //   this.setState({record:e.target.value});
  // }
  //
  // onSubmit (e) {
  //
  //   this.props.onClick(this.state.rank, this.state.name, this.state.record);
  // }

  render() {
    return (
      <div className="panel__field__stats">
          <span className="panel__field__rank editing-container">
            <input className="panel__field__stat panel__field__stat__rank--input stat--editing" onChange={(e) => this.onRankEdit(e)} defaultValue={this.props.rank} />
          </span>
          <span className="panel__field__name editing-container">
            <input className="panel__field__stat panel__field__stat__name--input stat--editing" onChange={(e) => this.onNameEdit(e)} defaultValue={this.props.name} />
          </span>
          <span className="panel__field__value editing-container">
            <input className="panel__field__stat panel__field__stat__value--input stat--editing" onChange={(e) => this.onRecordEdit(e)} defaultValue={this.props.record} />
          </span>
          <div className="panel__field__links">
            <i className="fa fa-save" aria-hidden="true" onClick={(e) => this.onStatChange(e)}></i>
          </div>
      </div>
    );
  }
}

// LeagueStatEditing.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default LeagueStatEditing;
