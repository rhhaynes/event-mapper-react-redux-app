import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHurricanes, removeHurricanes, toggleHurricanes } from '../actions/hurricaneActions';
import HurricanesByYear from '../components/hurricanes/HurricanesByYear';
import HurricanesByName from '../components/hurricanes/HurricanesByName';

class HurricanesContainer extends Component {
  render() {
    return (
      <div>

        <HurricanesByYear
          checked={this.props.hurricanes.map(obj => Object.keys(obj)[0])}
          addHurricanes={this.props.addHurricanes}
          removeHurricanes={this.props.removeHurricanes}
        />

        <HurricanesByName
          hurricanes={this.props.hurricanes}
          toggleHurricanes={this.props.toggleHurricanes}
        />

      </div>
    );
  }
}

export default connect(
  state => ({ hurricanes: state.hurricanes }),
  { addHurricanes, removeHurricanes, toggleHurricanes }
)(HurricanesContainer);
