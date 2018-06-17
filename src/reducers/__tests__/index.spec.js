import reducer from "../index";
import { GAME_STATUS, ACTIONS } from "../../constants";

describe("Root reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      gameStatus: GAME_STATUS.NOT_STARTED,
      players: [],
      playedCards: [],
      playAllowed: true,
      round: 0,
      gameWinners: {}
    });
  });

  it("Should handle GAME_STARTED", () => {
    expect(reducer([], { type: ACTIONS.GAME_STARTED, players: {} })).toEqual({
      gameStatus: GAME_STATUS.STARTED,
      players: {}
    });
  });

  it("Should handle RESTART_GAME", () => {
    expect(reducer([], { type: ACTIONS.RESTART_GAME })).toEqual({
      gameStatus: GAME_STATUS.NOT_STARTED,
      players: [],
      playedCards: [],
      playAllowed: true,
      round: 0,
      gameWinners: {}
    });
  });
});
