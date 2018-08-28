import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import EarthquakeMarker from '../components/map/EarthquakeMarker';
import HurricanePolyline from '../components/map/HurricanePolyline';
import VolcanoMarker from '../components/map/VolcanoMarker';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 2,
      center: { lat: 26, lng: 0 },
      options: { mapTypeId: 'terrain', minZoom: 2, maxZoom: 20, streetViewControl: false }
    };
  }

  componentWillReceiveProps() {
    const mapProps = this.mapInstance.context['__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'];
    this.setState({
      zoom: mapProps.zoom,
      center: { lat: mapProps.center.lat(), lng: mapProps.center.lng() },
      options: { mapTypeId: mapProps.mapTypeId, minZoom: mapProps.minZoom, maxZoom: mapProps.maxZoom, streetViewControl: false }
    });
  }

  render() {
    const GoogleMapWithMarker = withGoogleMap( props =>
      <GoogleMap
        ref={el => this.mapInstance = el}
        defaultZoom={this.state.zoom}
        defaultCenter={this.state.center}
        options={this.state.options}
      >

        {
          ( !Array.isArray(this.props.earthquakes) || !this.props.earthquakes.length )
          ? null
          : this.props.earthquakes.map( obj => {
            let queryStr = Object.keys(obj)[0];
            let eqArr    = obj[queryStr];
            return (
              eqArr.map( (eq, idx) => {
                let idStr = Object.keys(eq)[0];
                return (
                  <EarthquakeMarker
                    key={'mark'+idStr}
                    location={eq[idStr].location}
                    magnitude={eq[idStr].magnitude}
                    latlng={eq[idStr].latlng}
                    depth_km={eq[idStr].depth_km}
                  />
                );
              })
            );
          })
        }

        {
          ( !Array.isArray(this.props.hurricanes) || !this.props.hurricanes.length )
          ? null
          : this.props.hurricanes.map( obj => {
            let yearStr = Object.keys(obj)[0];
            let hurrArr = obj[yearStr];
            return (
              hurrArr.map( (hurr, idx) => {
                let nameStr  = Object.keys(hurr)[0];
                let status   = hurr[nameStr].status;
                let category = hurr[nameStr].category;
                let deaths   = hurr[nameStr].deaths;
                let latlng   = (status ? hurr[nameStr].latlng : []);
                return (
                  <HurricanePolyline
                    key={'poly'+yearStr+nameStr}
                    year={yearStr}
                    name={nameStr}
                    category={category}
                    deaths={deaths}
                    latlng={latlng}
                    index={idx}
                  />
                );
              })
            );
          })
        }

        {
          ( !Array.isArray(this.props.volcanoes) || !this.props.volcanoes.length )
          ? null
          : this.props.volcanoes.map( obj => {
            let charStr = Object.keys(obj)[0];
            let volArr = obj[charStr];
            return (
              volArr.map( (vol, idx) => {
                let nameStr = Object.keys(vol)[0];
                return (
                  <VolcanoMarker
                    key={'mark'+nameStr+`${idx}`}
                    name={nameStr}
                    location={vol[nameStr].location}
                    type={vol[nameStr].type}
                    latlng={vol[nameStr].latlng}
                    elev_m={vol[nameStr].elev_m}
                  />
                );
              })
            );
          })
        }

      </GoogleMap>
    );

    return (
      <GoogleMapWithMarker
        containerElement={<div style={{ height: `575px`, width: '1000px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
};

export default connect(
  state => ({
    earthquakes: state.earthquakes,
    hurricanes: state.hurricanes,
    volcanoes: state.volcanoes
  })
)(MapContainer);
