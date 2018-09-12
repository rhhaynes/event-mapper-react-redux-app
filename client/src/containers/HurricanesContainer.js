import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearMapContainer from './ClearMapContainer';
import { addHurricanes, removeHurricanes, toggleAllHurricanes, toggleHurricanes } from '../actions/hurricaneActions';
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
        <ClearMapContainer />

        <HurricanesByName
          hurricanes={this.props.hurricanes}
          toggleAllHurricanes={this.props.toggleAllHurricanes}
          toggleHurricanes={this.props.toggleHurricanes}
        />

      </div>
    );
  }
}

export default connect(
  state => ({ hurricanes: state.hurricanes }),
  { addHurricanes, removeHurricanes, toggleAllHurricanes, toggleHurricanes }
)(HurricanesContainer);
