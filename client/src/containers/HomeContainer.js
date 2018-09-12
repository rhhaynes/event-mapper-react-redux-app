import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearMapContainer from './ClearMapContainer';
import { fetchLocations, toggleLocations } from '../actions/locationActions';
import LocationsByName from '../components/locations/LocationsByName';

class HomeContainer extends Component {
  componentDidMount() {
    if ( !Array.isArray(this.props.locations) || !this.props.locations.length ) {
      this.props.fetchLocations();
    }
  }

  render() {
    return (
      <div>

        <LocationsByName
          locations={this.props.locations}
          toggleLocations={this.props.toggleLocations}
        />
        <ClearMapContainer />

      </div>
    );
  }
}

export default connect(
  state => ({ locations: state.locations }),
  { fetchLocations, toggleLocations }
)(HomeContainer);
