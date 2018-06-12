import { ACTIONS } from "../constants/ActionTypes";
import { GAME_STATUS } from "../constants/GameStatus";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GAME_STARTING:
      return { ...state, gameStatus: GAME_STATUS.STARTING };
    default:
      return state;
  }
}

export default rootReducer;
