export function addEarthquakes(queryStr) {
  return dispatch => (
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${queryStr}.geojson`)
    .then(resp => resp.json())
    .then(respJson => {

      const earthquakes = {
        [queryStr]: respJson.features.map( feature => ({
          [feature.id]: {
            location: feature.properties.place,
            magnitude: feature.properties.mag,
            latlng: { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] },
            depth_km: feature.geometry.coordinates[2]
          }
        }))
      };

      dispatch({type: 'ADD_EARTHQUAKES', payload: earthquakes});
    })
  );
}

export function removeEarthquakes(queryStr) {
  return {
    type: 'REMOVE_EARTHQUAKES',
    query: queryStr
  };
}
