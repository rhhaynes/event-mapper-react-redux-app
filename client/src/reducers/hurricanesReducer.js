export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_HURRICANES': {
      return (
        [...state, action.payload].sort( function(aObj, bObj){
          let a = Object.keys(aObj)[0];
          let b = Object.keys(bObj)[0];
          if (a < b){ return -1; }
          if (a > b){ return  1; }
          return 0;
        })
      );
    }

    case 'REMOVE_HURRICANES': {
      const idx = state.findIndex(obj => Object.keys(obj)[0] === action.year);
      return [...state.slice(0, idx), ...state.slice(idx+1)];
    }

    case 'TOGGLE_HURRICANES': {
      const idxYear = state.findIndex(obj => Object.keys(obj)[0] === action.year);
      const idxName = state[idxYear][action.year].findIndex(obj => Object.keys(obj)[0] === action.name);
      return [
        ...state.slice(0, idxYear),
          {
            [action.year] : [
              ...state[idxYear][action.year].slice(0, idxName),
                {
                  [action.name] : {
                    status: !state[idxYear][action.year][idxName][action.name].status,
                    category: state[idxYear][action.year][idxName][action.name].category,
                    deaths: state[idxYear][action.year][idxName][action.name].deaths,
                    latlng: state[idxYear][action.year][idxName][action.name].latlng}
                },
              ...state[idxYear][action.year].slice(idxName+1)]
          },
        ...state.slice(idxYear+1)];
    }

    case 'RESET': {
      return [];
    }

    default: {
      return state;
    }
  }
}
