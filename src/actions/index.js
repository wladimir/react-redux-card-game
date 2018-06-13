import { ACTIONS, API } from "../constants";
import axios from "axios";
import { getName, mapCardValue } from "../utils";

export function startGame(playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.GAME_STARTING });

    getCards()
      .then(res => {
        const players = [];

        for (let playerId = 0; playerId < playerCount; playerId++) {
          dealCards(res.data.deck_id)
            .then(res => {
              players.push(createPlayer(playerId, res));

              if (playerId + 1 === playerCount) {
                dispatch({ type: ACTIONS.GAME_STARTED, players });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

function createPlayer(playerId, res) {
  const cards = [];

  res.data.cards
    .map(card => {
      return {
        image: card.image,
        code: card.code,
        value: isNaN(card.value)
          ? mapCardValue(card.value)
          : parseInt(card.value, 10)
      };
    })
    .forEach(card => {
      cards.push(card);
    });

  return {
    id: playerId,
    name: playerId === 0 ? "Me" : getName(),
    score: 0,
    cards
  };
}

function getCards() {
  const shuffleDeckUrl = `${API.URL}deck/new/shuffle/?deck_count=1`;
  return axios.get(shuffleDeckUrl);
}

function dealCards(deckId) {
  const drawCardsUrl = `${API.URL}deck/${deckId}/draw/?count=10`;
  return axios.get(drawCardsUrl);
}
