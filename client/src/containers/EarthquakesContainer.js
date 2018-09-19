import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEarthquakes, removeEarthquakes } from '../actions/earthquakeActions';
import EarthquakesByDate from '../components/earthquakes/EarthquakesByDate';

class EarthquakesContainer extends Component {
  render() {
    return (
      <div className="App-dropdown-abs-container">

        <div className="form-title">
          Geolocation Options
        </div>

        <EarthquakesByDate
          checked={this.props.earthquakes.map(obj => Object.keys(obj)[0])}
          addEarthquakes={this.props.addEarthquakes}
          removeEarthquakes={this.props.removeEarthquakes}
        />

      </div>
    );
  }
}

export default connect(
  state => ({ earthquakes: state.earthquakes }),
  { addEarthquakes, removeEarthquakes }
)(EarthquakesContainer);
