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
          .catch(err => {
            dispatch({ type: ACTIONS.NOTIFY_NETWORK_ERROR, error: err });
            dispatch({ type: ACTIONS.RESTART_GAME });
          });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.NOTIFY_NETWORK_ERROR, error: err });
        dispatch({ type: ACTIONS.RESTART_GAME });
      });
  };
}

export function preloadImages(players, callback) {
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
        playOpponent(gameState, i, dispatch);
      }, getRandomPlaytime(i));
  };
}

// natural looking thinking time between plays
function getRandomPlaytime(index) {
  return 100 * Math.floor((Math.random() + 1) * 2) * index;
}

function playOpponent(gameState, player, dispatch) {
  const unplayedCards = gameState.players[player].cards.filter(
    card => !card.isPlayed
  );

  const randomCard =
    unplayedCards[Math.floor(Math.random() * unplayedCards.length)];

  dispatch({
    type: ACTIONS.CARD_PLAYED,
    player,
    card: randomCard.index
  });

  if (player + 1 === gameState.players.length)
    setTimeout(() => {
      dispatch({ type: ACTIONS.END_TURN });
    }, 2000);
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
  console.log("err");
  return dispatch => {
    dispatch({ type: ACTIONS.CLEAR_NETWORK_ERROR });
  };
}
