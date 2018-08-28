import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearMapContainer from './ClearMapContainer';
import { addEarthquakes, removeEarthquakes } from '../actions/earthquakeActions';
import EarthquakesByDate from '../components/earthquakes/EarthquakesByDate';

class EarthquakesContainer extends Component {
  render() {
    return (
      <div>

        <EarthquakesByDate
          checked={this.props.earthquakes.map(obj => Object.keys(obj)[0])}
          addEarthquakes={this.props.addEarthquakes}
          removeEarthquakes={this.props.removeEarthquakes}
        />

        <ClearMapContainer />

      </div>
    );
  }
}

export default connect(
  state => ({ earthquakes: state.earthquakes }),
  { addEarthquakes, removeEarthquakes }
)(EarthquakesContainer);
