import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class EarthquakeMarker extends Component {
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
          path: 'm -4,-4 l 0,8 l 8,0 l 0,-8 z',
          fillColor: '#00f',
          fillOpacity: 1,
          strokeColor: '#00f',
          strokeOpacity: 1
        }}
        onClick={() => this.props.zoomToMarker(this.props.latlng)}
        onMouseOver={() => this.toggleInfoWindow()}
        onMouseOut={() => this.toggleInfoWindow()}
      >
        { this.state.showInfoWindow &&
          <InfoWindow>
            <div className="map-info-window">
              <span style={{fontWeight:'bold'}}>{`Magnitude ${this.props.magnitude}`}</span><br />
              {this.props.location}<br />
              {`Depth of ${this.props.depth_km} km`}
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default EarthquakeMarker;
