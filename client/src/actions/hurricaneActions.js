export function addHurricanes(yearStr) {
  return dispatch => (
    fetch(`/api/hurricanes/${yearStr}`)
    .then(resp => resp.json())
    .then(respJson => {

      const hurricanes = {[yearStr]: { al: {}, ep: {} }};
      respJson.forEach( feature => (
        hurricanes[yearStr][feature.region] = {
          ...hurricanes[yearStr][feature.region],
          [feature.name]: {
            status: feature.region==='al' ? true : false,
            category: feature.category,
            deaths: feature.deaths,
            latlng: feature.geolocations,
            spaghettiModels: feature.spaghetti_models
          }
        }
      ));

      dispatch({type: 'ADD_HURRICANES', payload: hurricanes});
    })
  );
}

export function removeHurricanes(yearStr) {
  return {
    type: 'REMOVE_HURRICANES',
    year: yearStr
  };
}

export function toggleHurricanesByYear(yearStr) {
  return {
    type: 'TOGGLE_HURRICANES_BY_YEAR',
    year: yearStr
  }
}

export function toggleHurricanesByRegion(yearStr, regionStr) {
  return {
    type: 'TOGGLE_HURRICANES_BY_REGION',
    year: yearStr,
    region: regionStr
  }
}

export function toggleHurricanesByName(yearStr, regionStr, nameStr) {
  return {
    type: 'TOGGLE_HURRICANES_BY_NAME',
    year: yearStr,
    region: regionStr,
    name: nameStr
  };
}
