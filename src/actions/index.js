import { ACTIONS, API } from "../constants";
import axios from "axios";
import { getName, mapCardValue } from "../utils";

export function startGame(playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.GAME_STARTING });

    axios
      .get(`${API.URL}deck/new/shuffle/?deck_count=1`)
      .then(res => {
        const requests = [];
        for (let playerId = 0; playerId < playerCount; playerId++)
          requests.push(`${API.URL}deck/${res.data.deck_id}/draw/?count=10`);

        axios
          .all(requests.map(req => axios.get(req)))
          .then(
            axios.spread(function(...res) {
              const players = res.map((r, i) => createPlayer(i, r));

              let cardCounter = 0;
              players[0].cards.forEach(card => {
                const image = new Image();
                image.onload = function() {
                  cardCounter++;

                  if (cardCounter === 10)
                    dispatch({ type: ACTIONS.GAME_STARTED, players });
                };
                image.src = card.image;
              });
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
        played: false
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

export function playCard(card, playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.CARD_PLAYED, player: 0, card });

    for (let i = 1; i < playerCount; i++) {
      dispatch({ type: ACTIONS.CARD_PLAYED, player: i, card });
    }

    dispatch({ type: ACTIONS.END_TURN });
  };
}
