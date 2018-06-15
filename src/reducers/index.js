import { ACTIONS, GAME_STATUS } from "../constants";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  players: [],
  playedCards: []
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

    case ACTIONS.CARD_PLAYED:
      const { player, card } = action;

      return {
        ...state,
        playedCards: [...state.playedCards, state.players[player].cards[card]],
        ...(state.players[player].cards[card].isPlayed = true)
      };

    case ACTIONS.END_TURN:
      return { ...state };

    default:
      return state;
  }
}

export default rootReducer;
