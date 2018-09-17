import React from 'react';
import { Polyline } from 'react-google-maps';

const SpaghettiModelPolyline = props => (
  <Polyline
    geodesic={true}
    path={props.latlng}
    options={{
      strokeColor: '#AAA',
      strokeOpacity: 1,
      strokeWeight: 1
    }}
  />
);

export default SpaghettiModelPolyline;
