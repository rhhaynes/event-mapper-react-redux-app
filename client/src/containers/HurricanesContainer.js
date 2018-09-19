import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHurricanes, removeHurricanes, toggleAllHurricanes, toggleHurricanes } from '../actions/hurricaneActions';
import HurricanesByYear from '../components/hurricanes/HurricanesByYear';
import HurricanesByName from '../components/hurricanes/HurricanesByName';

class HurricanesContainer extends Component {
  render() {
    return (
      <div className="App-dropdown-abs-container">

        <div className="form-title">
          Geolocation Options
        </div>

        <HurricanesByYear
          checked={this.props.hurricanes.map(obj => Object.keys(obj)[0])}
          addHurricanes={this.props.addHurricanes}
          removeHurricanes={this.props.removeHurricanes}
        />

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
