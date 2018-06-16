export const ACTIONS = {
  GAME_STARTING: "GAME_STARTING",
  GAME_STARTED: "GAME_STARTED",
  CARD_PLAYED: "CARD_PLAYED",
  END_TURN: "END_TURN",
  RESTART_GAME: "RESTART_GAME"
};

export const GAME_STATUS = Object.freeze({
  NOT_STARTED: 0,
  STARTING: 1,
  STARTED: 2
});

export const NUMBER_OF_CARDS = 10;

export const API = {
  URL: "https://deckofcardsapi.com/api/"
};
