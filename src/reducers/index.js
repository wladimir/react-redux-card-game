import { ACTIONS, GAME_STATUS } from "../constants";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  players: [],
  currentPlayer: 0,
  currentRound: 0,
  table: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GAME_STARTING:
      return { ...state, gameStatus: GAME_STATUS.STARTING };

    case ACTIONS.GAME_STARTED:
      return {
        ...state,
        gameStatus: GAME_STATUS.STARTED,
        players: action.players
      };

    default:
      return state;
  }
}

export default rootReducer;
