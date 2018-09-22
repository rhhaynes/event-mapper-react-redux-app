import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHurricanes, removeHurricanes } from '../actions/hurricaneActions';
import HurricanesByYear from '../components/hurricanes/HurricanesByYear';

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

      </div>
    );
  }
}

export default connect(
  state => ({ hurricanes: state.hurricanes }),
  { addHurricanes, removeHurricanes }
)(HurricanesContainer);
