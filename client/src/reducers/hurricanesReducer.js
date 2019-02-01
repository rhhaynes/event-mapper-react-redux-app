export default (state = {}, action) => {

  switch (action.type) {

    case 'ADD_HURRICANES': {
      return {...state, ...action.payload};
    }

    case 'REMOVE_HURRICANES': {
      delete state[action.year];
      return {...state};
    }

    case 'TOGGLE_HURRICANES_BY_YEAR': {
      const status = !state[action.year]['al'][Object.keys(state[action.year]['al'])[0]].status;
      Object.keys(state[action.year]).forEach( region => (
        Object.keys(state[action.year][region]).forEach( hurrName => (
          state[action.year][region][hurrName].status = status
        ))
      ));
      return {...state};
    }

    case 'TOGGLE_HURRICANES_BY_REGION': {
      const status = !state[action.year][action.region][Object.keys(state[action.year][action.region])[0]].status;
      Object.keys(state[action.year][action.region]).forEach( hurrName => (
        state[action.year][action.region][hurrName].status = status
      ));
      return {...state};
    }

    case 'TOGGLE_HURRICANES_BY_NAME': {
      state[action.year][action.region][action.name].status = !state[action.year][action.region][action.name].status;
      return {...state};
    }

    case 'RESET': {
      return {};
    }

    default: {
      return state;
    }
  }
}
