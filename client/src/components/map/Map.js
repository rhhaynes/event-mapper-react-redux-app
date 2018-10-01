import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { customNight } from './styles/customNight';
import EarthquakeMarker from './EarthquakeMarker';
import HurricanePolyline from './HurricanePolyline';
import LocationMarker from './LocationMarker';
import VolcanoMarker from './VolcanoMarker';

const zoomToMarker = markerPos => {
  const zoom = this.map.getZoom();
  ( zoom<10 ? this.map.setZoom(10) : this.map.setZoom(zoom+1) );
  this.map.setCenter(markerPos);
};

const Map = withGoogleMap( props => (
  <GoogleMap
    ref={ref => this.map = (!ref ? ref : ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)}
    defaultZoom={2}
    defaultCenter={{ lat: 26, lng: 0 }}
    options={{ minZoom: 2, maxZoom: 20, streetViewControl: false, styles: customNight }}
    onClick={event => props.handleMapClick(event)}
  >

    { !!props.form.lat && !!props.form.lng &&
      <Marker
        position={{ lat: Number(props.form.lat), lng: Number(props.form.lng) }}
        onClick={() => props.handleMarkerClick()}
      />
    }

    {
      ( !Array.isArray(props.earthquakes) || !props.earthquakes.length )
      ? null
      : props.earthquakes.map( obj => {
        let queryStr = Object.keys(obj)[0];
        let eqArr = obj[queryStr];
        return (
          eqArr.map( (eq, idx) => {
            let idStr = Object.keys(eq)[0];
            return (
              <EarthquakeMarker
                key={'markEarthquake-'+idStr}
                location={eq[idStr].location}
                magnitude={eq[idStr].magnitude}
                latlng={eq[idStr].latlng}
                depth_km={eq[idStr].depth_km}
                zoomToMarker={zoomToMarker}
              />
            );
          })
        );
      })
    }

    {
      ( !Array.isArray(props.hurricanes) || !props.hurricanes.length )
      ? null
      : props.hurricanes.map( obj => {
        let yearStr = Object.keys(obj)[0];
        let hurrArr = obj[yearStr];
        return (
          hurrArr.map( (hurr, idx) => {
            let nameStr = Object.keys(hurr)[0];
            let status = hurr[nameStr].status;
            let category = hurr[nameStr].category;
            let deaths = hurr[nameStr].deaths;
            let latlng = (status ? hurr[nameStr].latlng : []);
            let spaghettiModels = (status && props.statusSM ? hurr[nameStr].spaghettiModels : []);
            return (
              <HurricanePolyline
                key={'polyHurricane-'+yearStr+nameStr}
                year={yearStr}
                name={nameStr}
                category={category}
                deaths={deaths}
                latlng={latlng}
                spaghettiModels={spaghettiModels}
                index={idx}
              />
            );
          })
        );
      })
    }

    {
      ( !Array.isArray(props.locations) || !props.locations.length )
      ? null
      : props.locations.map( (obj, idx) => (
        ( !obj.status )
        ? null
        : <LocationMarker
            key={`markLocation-${obj.name}${idx}`}
            name={obj.name}
            description={obj.description}
            latlng={obj.latlng}
            zoomToMarker={zoomToMarker}
          />
      ))
    }

    {
      ( !Array.isArray(props.volcanoes) || !props.volcanoes.length )
      ? null
      : props.volcanoes.map( obj => {
        let charStr = Object.keys(obj)[0];
        let volArr = obj[charStr];
        return (
          volArr.map( (vol, idx) => {
            let nameStr = Object.keys(vol)[0];
            return (
              <VolcanoMarker
                key={'markVolcano-'+nameStr+`${idx}`}
                name={nameStr}
                location={vol[nameStr].location}
                type={vol[nameStr].type}
                latlng={vol[nameStr].latlng}
                elev_m={vol[nameStr].elev_m}
                zoomToMarker={zoomToMarker}
              />
            );
          })
        );
      })
    }

  </GoogleMap>
));

export default Map;
