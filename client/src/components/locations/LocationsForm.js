import React, { Component } from 'react';

class LocationsForm extends Component {
  render() {
    return (
      <form onSubmit={event => this.props.handleFormSubmit(event)}>

        <input
          className="locations-form-input"
          type="text"
          name="name"
          value={this.props.form.name}
          placeholder="Location Name"
          onChange={event => this.props.handleFormChange(event)}
        /><br />

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
        /><br />

        <textarea
          className="locations-form-input description-size"
          name="description"
          value={this.props.form.description}
          placeholder="Description"
          onChange={event => this.props.handleFormChange(event)}
        /><br />

        <input
          className="locations-form-submit"
          type="submit"
        />

      </form>
    );
  }
}

export default LocationsForm;
