import { ACTIONS } from "../constants";

const initialState = { error: null };

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.NOTIFY_NETWORK_ERROR:
      return {
        ...state,
        error: "Network error, please check your internet connection!"
      };

    case ACTIONS.CLEAR_NETWORK_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

export default errorReducer;
