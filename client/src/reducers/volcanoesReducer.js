export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_VOLCANOES': {
      return (
        [...state, action.payload].sort( (aObj, bObj) => {
          const a = Object.keys(aObj)[0];
          const b = Object.keys(bObj)[0];
          if (a < b){ return -1; }
          if (a > b){ return  1; }
          return 0;
        })
      );
    }

    case 'REMOVE_VOLCANOES': {
      const idx = state.findIndex(obj => Object.keys(obj)[0] === action.char);
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
