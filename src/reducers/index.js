import { ACTIONS } from "../constants/ActionTypes";

const initialState = {
  started: true
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GAME_STARTING:
      return { ...state };
    default:
      return state;
  }
}

export default rootReducer;
