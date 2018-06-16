import { ACTIONS, GAME_STATUS } from "../constants";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  players: [],
  playedCards: [],
  playAllowed: true,
  gameEnd: false
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
      const maxValueIndex = state.playedCards
        .map(card => card.value)
        .reduce((max, x, i, cards) => (x > cards[max] ? i : max), 0);

      const winningCards = state.playedCards.filter(
        card => card.value === state.playedCards[maxValueIndex].value
      );

      let winner = -1;
      state.players.forEach((player, index) => {
        const match = player.cards.find(
          card => winningCards.indexOf(card) >= 0
        );
        if (match) winner = index;
      });

      const points = state.playedCards
        .map(card => card.value)
        .reduce((a, b) => a + b, 0);

      console.log("Winner is:", state.players[winner].name);
      console.log(
        "Points awarded:",
        state.playedCards.map(card => card.value).join("+"),
        "=",
        points
      );

      return {
        ...state,
        playedCards: [],
        ...(state.players[winner].score += points)
      };

    default:
      return state;
  }
}

export default rootReducer;
