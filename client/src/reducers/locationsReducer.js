export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_LOCATION': {
      return [...state, action.payload];
    }

    case 'FETCH_LOCATIONS': {
      return action.payload;
    }

    case 'RESET': {
      return state.map(obj => ({
        name: obj.name,
        description: obj.description,
        latlng: obj.latlng,
        status: false
      }));
    }

    case 'TOGGLE_LOCATIONS': {
      const idx = state.findIndex(obj => obj.name === action.name);
      return [
        ...state.slice(0, idx),
        {
          name: state[idx].name,
          description: state[idx].description,
          latlng: state[idx].latlng,
          status: !state[idx].status
        },
        ...state.slice(idx+1)];
    }

    default: {
      return state;
    }
  }
}
