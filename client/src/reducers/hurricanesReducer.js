export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_HURRICANES': {
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

    case 'REMOVE_HURRICANES': {
      const idx = state.findIndex(obj => Object.keys(obj)[0] === action.year);
      return [...state.slice(0, idx), ...state.slice(idx+1)];
    }

    case 'TOGGLE_ALL_HURRICANES': {
      const idxYear = state.findIndex(obj => Object.keys(obj)[0] === action.year);
      const status = !state[idxYear][action.year][0][Object.keys(state[idxYear][action.year][0])[0]].status;
      return [
        ...state.slice(0, idxYear),
        {
          [action.year] : state[idxYear][action.year].map( (obj, idxName) => {
            const hurrName = Object.keys(obj)[0];
            return {
              [hurrName] : {
                status: status,
                category: state[idxYear][action.year][idxName][hurrName].category,
                deaths: state[idxYear][action.year][idxName][hurrName].deaths,
                latlng: state[idxYear][action.year][idxName][hurrName].latlng,
                spaghettiModels: state[idxYear][action.year][idxName][hurrName].spaghettiModels
              }
            };
          })
        },
        ...state.slice(idxYear+1)];
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
                    latlng: state[idxYear][action.year][idxName][action.name].latlng,
                    spaghettiModels: state[idxYear][action.year][idxName][action.name].spaghettiModels}
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
