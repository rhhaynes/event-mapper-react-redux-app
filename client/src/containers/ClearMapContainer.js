import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetMap } from '../actions/mapActions';

class ClearMapContainer extends Component {
  render() {
    return (
      <div className="App-medium-sub" onClick={() => this.props.resetMap()}>
        <div className="App-medium-subtext">
          Clear map
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { resetMap }
)(ClearMapContainer);
