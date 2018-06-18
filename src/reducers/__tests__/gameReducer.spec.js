import reducer from "../index";
import { GAME_STATUS, ACTIONS } from "../../constants";

describe("Game reducer", () => {
  const initialState = {
    errorReducer: {},
    gameReducer: {
      gameStatus: GAME_STATUS.NOT_STARTED,
      players: [],
      playedCards: [],
      playAllowed: true,
      round: 0,
      gameWinners: {},
      activePlayer: 0
    }
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle GAME_STARTED", () => {
    expect(
      reducer(
        { gameReducer: {}, errorReducer: {} },
        { type: ACTIONS.GAME_STARTED, players: [] }
      )
    ).toEqual({
      gameReducer: { gameStatus: GAME_STATUS.STARTED, players: [] },
      errorReducer: {}
    });
  });

  it("Should handle RESTART_GAME", () => {
    expect(
      reducer(
        { gameReducer: {}, errorReducer: {} },
        { type: ACTIONS.RESTART_GAME }
      )
    ).toEqual(initialState);
  });
});
