import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class VolcanoMarker extends Component {
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
          path: 'm 0,-6 l -5.2,9 l 10.4,0 z',
          fillColor: '#f00',
          fillOpacity: 1,
          strokeColor: '#f00',
          strokeOpacity: 1
        }}
        onMouseOver={() => this.toggleInfoWindow()}
        onMouseOut={() => this.toggleInfoWindow()}
      >
        { this.state.showInfoWindow &&
          <InfoWindow>
            <div className="map-info-window">
              <span style={{fontWeight:'bold'}}>{this.props.name}</span><br />
              {this.props.location}<br />
              {this.props.type}<br />
              {`Elevation of ${this.props.elev_m} m`}
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default VolcanoMarker;
