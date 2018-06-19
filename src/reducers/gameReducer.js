import { ACTIONS, GAME_STATUS } from "../constants";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  players: [],
  playedCards: [],
  playAllowed: true,
  round: 0,
  gameWinners: {},
  activePlayer: 0
};

function gameReducer(state = initialState, action) {
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
        ...(state.players[player].cards[card].isPlayed = true),
        playAllowed: false,
        activePlayer: player
      };

    case ACTIONS.END_TURN:
      const { winner, points, gameWinners } = action.payload;

      return {
        ...state,
        playedCards: [],
        ...(state.players[winner].score += points),
        playAllowed: true,
        round: state.round + 1,
        activePlayer: 0,
        gameWinners: gameWinners
      };

    case ACTIONS.RESTART_GAME:
      return initialState;

    default:
      return state;
  }
}

export default gameReducer;
