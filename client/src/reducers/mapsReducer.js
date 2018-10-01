export default (state = {
  status: { spaghettiModels: false }
}, action) => {

  switch (action.type) {

    case 'TOGGLE_SPAGHETTI_MODELS': {
      return {
        status: { spaghettiModels: !state.status.spaghettiModels }
      };
    }

    case 'RESET': {
      return {
        status: { spaghettiModels: false }
      };
    }

    default: {
      return state;
    }
  }
}
