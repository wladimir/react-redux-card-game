import { ACTIONS } from "../constants/ActionTypes";

export function startGame(playerCount) {
  return dispatch => {
    dispatch({ type: ACTIONS.GAME_STARTING });
  };
}
