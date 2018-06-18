import { ACTIONS, GAME_STATUS, NUMBER_OF_CARDS } from "../constants";

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
      const { playedCards, players } = state;

      const turnResult = getTurnResult(playedCards, players);

      let newState = {
        ...state,
        playedCards: [],
        ...(state.players[turnResult.winner].score += turnResult.points),
        playAllowed: true,
        round: state.round + 1,
        activePlayer: 0
      };

      if (newState.round === NUMBER_OF_CARDS)
        newState = {
          ...newState,
          gameWinners: getGameWinners(newState)
        };

      return newState;

    case ACTIONS.RESTART_GAME:
      return initialState;

    default:
      return state;
  }
}

function getTurnResult(playedCards, players) {
  const winningCards = getWinningCards(playedCards);

  let winner = -1;
  players.forEach((player, index) => {
    const match = player.cards.find(card => winningCards.indexOf(card) >= 0);
    if (match) winner = index;
  });

  return {
    winner,
    points: playedCards.map(card => card.value).reduce((a, b) => a + b, 0)
  };
}

function getWinningCards(playedCards) {
  const maxValueIndex = playedCards
    .map(card => card.value)
    .reduce((max, x, i, cards) => (x > cards[max] ? i : max), 0);

  return playedCards.filter(
    card => card.value === playedCards[maxValueIndex].value
  );
}

function getGameWinners(state) {
  const maxPointsIndex = state.players
    .map(player => player.score)
    .reduce((max, x, i, players) => (x > players[max] ? i : max), 0);

  const winners = state.players.filter(
    player => player.score === state.players[maxPointsIndex].score
  );

  return {
    names: winners.map(winner => winner.name),
    score: state.players[maxPointsIndex].score
  };
}

export default gameReducer;
