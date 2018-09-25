import React from 'react';
import { withGoogleMap } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const SearchBox = withGoogleMap( props => (
  <StandaloneSearchBox
    ref={ref => this.searchBox = ref}
    onPlacesChanged={() => props.handlePlacesChanged(this.searchBox.getPlaces())}
  >
    <input
      className="locations-form-input"
      type="text"
      name="name"
      value={props.value}
      placeholder="Location Name"
      onChange={event => props.handleFormChange(event)}
    />
  </StandaloneSearchBox>
));

export default SearchBox;
