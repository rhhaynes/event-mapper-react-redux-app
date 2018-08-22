export function addVolcanoes(charStr) {
  return dispatch => (
    fetch(`/api/volcanoes/${charStr}`)
    .then(resp => resp.json())
    .then(respJson => {

      const volcanoes = {
        [charStr]: respJson.map( feature => ({
          [feature.name]: {
            location: feature.location,
            type: feature.category,
            latlng: feature.geolocation,
            elev_m: feature.elev_m
          }
        }))
      };

      dispatch({type: 'ADD_VOLCANOES', payload: volcanoes});
    })
  );
}

export function removeVolcanoes(charStr) {
  return {
    type: 'REMOVE_VOLCANOES',
    char: charStr
  };
}
