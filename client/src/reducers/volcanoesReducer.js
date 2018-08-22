export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_VOLCANOES': {
      return [...state, action.payload];
    }

    case 'REMOVE_VOLCANOES': {
      const idx = state.findIndex(obj => Object.keys(obj)[0] === action.char);
      return [...state.slice(0, idx), ...state.slice(idx+1)];
    }

    default: {
      return state;
    }
  }
}
