export function addHurricanes(yearStr) {
  return dispatch => (
    fetch(`/api/hurricanes/${yearStr}`)
    .then(resp => resp.json())
    .then(respJson => {

      const hurricanes = {
        [yearStr]: respJson.map( feature => ({
          [feature.name]: {
            status: feature.status,
            category: feature.category,
            deaths: feature.deaths,
            latlng: feature.geolocations
          }
        }))
      };

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

export function toggleAllHurricanes(yearStr) {
  return {
    type: 'TOGGLE_ALL_HURRICANES',
    year: yearStr
  }
}

export function toggleHurricanes(yearStr, nameStr) {
  return {
    type: 'TOGGLE_HURRICANES',
    year: yearStr,
    name: nameStr
  };
}
