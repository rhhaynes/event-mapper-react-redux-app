export function createLocation(formData) {
  return dispatch => (
    fetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .then(resp => resp.json())
    .then(respJson => {
      const location = {
        name: respJson.name,
        description: respJson.description,
        latlng: respJson.geolocation,
        status: true
      };

      dispatch({type: 'ADD_LOCATION', payload: location});
    })
  );
}

export function fetchLocations() {
  return dispatch => (
    fetch('/api/locations')
    .then(resp => resp.json())
    .then(respJson => {

      const locations = respJson.map( feature => ({
        name: feature.name,
        description: feature.description,
        latlng: feature.geolocation,
        status: true
      }));

      dispatch({type: 'FETCH_LOCATIONS', payload: locations});
    })
  );
}

export function toggleLocations(nameStr) {
  return {
    type: 'TOGGLE_LOCATIONS',
    name: nameStr
  };
}
