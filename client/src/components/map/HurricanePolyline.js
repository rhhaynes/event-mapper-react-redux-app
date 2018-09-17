import React, { Component } from 'react';
import { Polyline, InfoWindow } from 'react-google-maps';
import { PolylineColors } from './PolylineColors';
import SpaghettiModelPolyline from './SpaghettiModelPolyline';

class HurricanePolyline extends Component {
  constructor() {
    super();
    this.state = {
      showInfoWindow: false,
      posInfoWindow: { lat: null, lng: null }
    };
  }

  toggleInfoWindow(event) {
    this.setState({
      showInfoWindow: !this.state.showInfoWindow,
      posInfoWindow: { lat: event.latLng.lat(), lng: event.latLng.lng() }
    });
  }

  render() {
    return (
      <div>

        { !!this.props.spaghettiModels.length &&
          this.props.spaghettiModels.map( sm => (
            <SpaghettiModelPolyline
              key={sm.name}
              latlng={sm.geolocations}
            />
          ))
        }

        <Polyline
          geodesic={true}
          path={this.props.latlng}
          options={{
            strokeColor: PolylineColors[this.props.index],
            strokeOpacity: 1,
            strokeWeight: 3
          }}
          onMouseOver={event => this.toggleInfoWindow(event)}
          onMouseOut={event => this.toggleInfoWindow(event)}
        />

        { this.state.showInfoWindow &&
          <InfoWindow position={this.state.posInfoWindow}>
            <div className="App-info-window">
              <span style={{fontWeight:'bold'}}>{this.props.name}</span><br />
              {this.props.year}<br />
              {`Category ${this.props.category}`}<br />
              { this.props.deaths
              ? this.props.deaths===1 ? `${this.props.deaths} death` : `${this.props.deaths} deaths`
              : null }
            </div>
          </InfoWindow>
        }

      </div>
    );
  }
}

export default HurricanePolyline;
