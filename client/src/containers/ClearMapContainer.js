import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetMap } from '../actions/mapActions';

class ClearMapContainer extends Component {
  render() {
    return (
      <button
        className="clear-map-btn"
        onClick={() => {
          this.props.clearForm();
          this.props.resetMap();
        }}
      >Clear Map</button>
    );
  }
}

export default connect(
  null,
  { resetMap }
)(ClearMapContainer);
