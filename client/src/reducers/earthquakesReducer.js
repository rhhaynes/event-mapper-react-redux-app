export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_EARTHQUAKES': {
      return [...state, action.payload];
    }

    case 'REMOVE_EARTHQUAKES': {
      const idx = state.findIndex(obj => Object.keys(obj)[0] === action.query);
      return [...state.slice(0, idx), ...state.slice(idx+1)];
    }

    case 'RESET': {
      return [];
    }

    default: {
      return state;
    }
  }
}
