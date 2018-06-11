import { ACTIONS } from "../constants/ActionTypes";

export const gameStarting = game => ({
  type: ACTIONS.GAME_STARTING,
  game
});

export const gameStarted = game => ({
  type: ACTIONS.GAME_STARTED,
  game
});
