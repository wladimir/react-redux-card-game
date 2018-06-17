import { ACTIONS, API, NUMBER_OF_CARDS } from "../constants";
import axios from "axios";
import { getName, mapCardValue } from "../utils";

export function startGame(playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.GAME_STARTING });

    getDeck()
      .then(res => {
        const requests = initRequests(res.data.deck_id, playerCount);

        dealCards(requests)
          .then(
            axios.spread(function(...res) {
              const players = res.map((r, i) => createPlayer(i, r));

              // preload images
              players.forEach((player, i) =>
                player.cards.forEach((card, j) => {
                  const image = new Image();
                  image.onload = function() {
                    // when all are loaded, dispatch action
                    if (i + 1 === players.length && j + 1 === NUMBER_OF_CARDS)
                      dispatch({ type: ACTIONS.GAME_STARTED, players });
                  };
                  image.src = card.image;
                })
              );
            })
          )
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
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
    const state = getState();

    if (!state.playAllowed) return;

    const playerCount = state.players.length;

    dispatch({ type: ACTIONS.CARD_PLAYED, player: 0, card });

    for (let i = 1; i < playerCount; i++)
      setTimeout(() => {
        playOpponent(state, i, dispatch);
      }, getRandomPlaytime(i));
  };
}

// natural looking thinking time between plays
function getRandomPlaytime(index) {
  return 500 * Math.floor((Math.random() + 1) * 2) * index;
}

function playOpponent(state, player, dispatch) {
  const unplayedCards = state.players[player].cards.filter(
    card => !card.isPlayed
  );

  const randomCard =
    unplayedCards[Math.floor(Math.random() * unplayedCards.length)];

  dispatch({
    type: ACTIONS.CARD_PLAYED,
    player,
    card: randomCard.index
  });

  if (player + 1 === state.players.length)
    setTimeout(() => {
      dispatch({ type: ACTIONS.END_TURN });
    }, 2000);
}

function getDeck() {
  return axios.get(`${API.URL}deck/new/shuffle/?deck_count=1`);
}

function initRequests(deckId, playerCount) {
  const requests = [];
  for (let playerId = 0; playerId < playerCount; playerId++)
    requests.push(`${API.URL}deck/${deckId}/draw/?count=${NUMBER_OF_CARDS}`);
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
