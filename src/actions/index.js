import { ACTIONS, API, NUMBER_OF_CARDS } from "../constants";
import axios from "axios";
import { getName, mapCardValue } from "../utils";

export function startGame(playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.GAME_STARTING });

    return getDeck()
      .then(res => {
        const requests = initRequests(res.data.deck_id, playerCount);

        dealCards(requests)
          .then(
            axios.spread(function(...res) {
              const players = res.map((r, i) => createPlayer(i, r));

              preloadImages(players, function() {
                dispatch({ type: ACTIONS.GAME_STARTED, players });
              });
            })
          )
          .catch(error => {
            dispatch({ type: ACTIONS.NOTIFY_NETWORK_ERROR, error });
            dispatch({ type: ACTIONS.RESTART_GAME });
          });
      })
      .catch(error => {
        dispatch({ type: ACTIONS.NOTIFY_NETWORK_ERROR, error });
        dispatch({ type: ACTIONS.RESTART_GAME });
      });
  };
}

function preloadImages(players, callback) {
  players.forEach((player, i) =>
    player.cards.forEach((card, j) => {
      const image = new Image();

      image.onload = function() {
        if (i + 1 === players.length && j + 1 === NUMBER_OF_CARDS) callback();
      };

      image.src = card.image;
    })
  );
}

function createPlayer(playerId, res) {
  const cards = [];

  res.data.cards
    .map((card, i) => {
      return {
        image: card.image,
        code: card.code,
        value: isNaN(card.value)
          ? mapCardValue(card.value)
          : parseInt(card.value, 10),
        index: i,
        isPlayed: false
      };
    })
    .forEach(card => {
      cards.push(card);
    });

  return {
    id: playerId,
    name: playerId === 0 ? "me" : getName(),
    score: 0,
    cards
  };
}

export function playCard(card) {
  return (dispatch, getState) => {
    const gameState = getState().gameReducer;

    if (!gameState.playAllowed) return;

    const playerCount = gameState.players.length;

    dispatch({ type: ACTIONS.CARD_PLAYED, player: 0, card });

    for (let i = 1; i < playerCount; i++)
      setTimeout(() => {
        playOpponent(getState, i, dispatch);
      }, getRandomPlaytime(i));
  };
}

// natural looking thinking time between plays
function getRandomPlaytime(index) {
  return 300 * Math.floor((Math.random() + 1) * 2) * index;
}

function playOpponent(getState, player, dispatch) {
  const currentState = getState().gameReducer;
  const unplayedCards = currentState.players[player].cards.filter(
    card => !card.isPlayed
  );

  const randomCard =
    unplayedCards[Math.floor(Math.random() * unplayedCards.length)];

  dispatch({
    type: ACTIONS.CARD_PLAYED,
    player,
    card: randomCard.index
  });

  if (player + 1 === currentState.players.length) {
    const nextState = getState().gameReducer;
    endTurn(nextState, dispatch);
  }
}

function endTurn(state, dispatch) {
  const { playedCards, players, round } = state;

  const winningCards = getWinningCards(playedCards);

  let winner = -1;
  players.forEach((player, index) => {
    const match = player.cards.find(card => winningCards.indexOf(card) >= 0);
    if (match) winner = index;
  });

  const points = playedCards.map(card => card.value).reduce((a, b) => a + b, 0);

  const payload = { winner, points, gameWinners: {} };

  if (round + 1 === NUMBER_OF_CARDS)
    payload.gameWinners = getGameWinners(state);

  setTimeout(() => {
    dispatch({ type: ACTIONS.END_TURN, payload });
  }, 2000);
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

function getDeck() {
  return axios.get(`${API.URL}/api/deck/new/shuffle/?deck_count=1`);
}

function initRequests(deckId, playerCount) {
  const requests = [];
  for (let playerId = 0; playerId < playerCount; playerId++)
    requests.push(
      `${API.URL}/api/deck/${deckId}/draw/?count=${NUMBER_OF_CARDS}`
    );
  return requests;
}

function dealCards(requests) {
  return axios.all(requests.map(req => axios.get(req)));
}

export function restartGame() {
  return dispatch => {
    dispatch({ type: ACTIONS.RESTART_GAME });
  };
}

export function clearError() {
  return dispatch => {
    dispatch({ type: ACTIONS.CLEAR_NETWORK_ERROR });
  };
}
