import React, { Component } from 'react';
import SearchBox from './SearchBox';

class LocationsForm extends Component {
  render() {
    return (
      <form onSubmit={event => this.props.handleFormSubmit(event)}>

        <div className="form-title">
          New Location Marker
        </div>

        <SearchBox
          containerElement={<div style={{ height: null }} />}
          mapElement={<div style={{ height: null }} />}
          value={this.props.form.name}
          handleFormChange={event => this.props.handleFormChange(event)}
          handlePlacesChanged={places => this.props.handlePlacesChanged(places)}
        />

        <input
          className="locations-form-input latlng-size"
          type="text"
          name="lat"
          value={this.props.form.lat}
          placeholder="Latitude"
          onChange={event => this.props.handleFormChange(event)}
        />&nbsp;

        <input
          className="locations-form-input latlng-size"
          type="text"
          name="lng"
          value={this.props.form.lng}
          placeholder="Longitude"
          onChange={event => this.props.handleFormChange(event)}
        />

        <textarea
          className="locations-form-input description-size"
          name="description"
          value={this.props.form.description}
          placeholder="Description"
          onChange={event => this.props.handleFormChange(event)}
        />

        <input
          className="locations-form-submit"
          type="submit"
          value="Create Marker"
        />

      </form>
    );
  }
}

export default LocationsForm;
