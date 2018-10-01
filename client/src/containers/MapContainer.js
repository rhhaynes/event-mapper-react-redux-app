import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLocation } from '../actions/locationActions';
import ClearMapContainer from './ClearMapContainer';
import LocationsForm from '../components/locations/LocationsForm';
import Map from '../components/map/Map';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = { form: { name: '', lat: '', lng: '', description: '' }};
  }

  clearForm() {
    this.setState({ form: { name: '', lat: '', lng: '', description: '' }});
  }

  handleFormChange(event) {
    const form = Object.assign( {}, this.state.form, {
      [event.target.name]: event.target.value
    });
    this.setState({ form: form });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.createLocation({
      location: {
        name: this.state.form.name,
        description: this.state.form.description,
        geolocation_attributes: { lat: this.state.form.lat, lng: this.state.form.lng }
      }
    });
    this.clearForm();
  }

  handleMapClick(event) {
    const form = Object.assign( {}, this.state.form, {
      lat: event.latLng.lat().toString(10),
      lng: event.latLng.lng().toString(10)
    });
    this.setState({ form: form });
  }

  handlePlacesChanged(places) {
    const form = Object.assign( {}, this.state.form, {
      name: places[0].name,
      lat:  places[0].geometry.location.lat().toString(10),
      lng:  places[0].geometry.location.lng().toString(10),
      description: places[0].formatted_address
    });
    this.setState({ form: form });
  }

  render() {
    return (
      <div style={{ display:'flex' }}>

        <div className="App-float-lt-container">
          <LocationsForm
            form={this.state.form}
            handleFormChange={event => this.handleFormChange(event)}
            handleFormSubmit={event => this.handleFormSubmit(event)}
            handlePlacesChanged={places => this.handlePlacesChanged(places)}
          />
          <ClearMapContainer
            clearForm={() => this.clearForm()}
          />
        </div>

        <div className="App-float-rt-container">
          <Map
            containerElement={<div style={{ height: '575px', width: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            statusSM={this.props.mapOptions.status.spaghettiModels}
            earthquakes={this.props.earthquakes}
            hurricanes={this.props.hurricanes}
            locations={this.props.locations}
            volcanoes={this.props.volcanoes}
            form={this.state.form}
            handleMapClick={event => this.handleMapClick(event)}
            handleMarkerClick={() => this.clearForm()}
          />
        </div>

      </div>
    );
  }
};

export default connect(
  state => ({
    mapOptions: state.mapOptions,
    earthquakes: state.earthquakes,
    hurricanes: state.hurricanes,
    locations: state.locations,
    volcanoes: state.volcanoes
  }),
  { createLocation }
)(MapContainer);
