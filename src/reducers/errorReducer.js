import { ACTIONS } from "../constants";

function errorReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.NOTIFY_NETWORK_ERROR:
      return {
        ...state,
        error: Error("Network Error")
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
