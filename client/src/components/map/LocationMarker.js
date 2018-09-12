import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class LocationMarker extends Component {
  constructor() {
    super();
    this.state = { showInfoWindow: false };
  }

  toggleInfoWindow() {
    this.setState({ showInfoWindow: !this.state.showInfoWindow });
  }

  render() {
    return (
      <Marker
        position={this.props.latlng}
        icon={{
          path: 'm -6,0 l 6,6 l 6,-6 l -6,-6 z',
          fillColor: '#070',
          fillOpacity: 1,
          strokeColor: '#070',
          strokeOpacity: 1
        }}
        onMouseOver={() => this.toggleInfoWindow()}
        onMouseOut={() => this.toggleInfoWindow()}
      >
        { this.state.showInfoWindow &&
          <InfoWindow>
            <div className="App-info-window">
              <span style={{fontWeight:'bold'}}>{this.props.name}</span><br />
              {this.props.description}
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default LocationMarker;
