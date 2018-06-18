import configureStore from "redux-mock-store";
import * as actions from "../index";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { ACTIONS, GAME_STATUS, API } from "../../constants";
import img from "../../assets/images/card_background.jpg";

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  players: [],
  playedCards: [],
  playAllowed: true,
  round: 0,
  gameWinners: {}
};

const mockStore = configureStore([thunk]);
const mockAxios = new MockAdapter(axios);
let store;

describe("async actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const apiResponse = {
    success: true,
    deck_id: "066wgqtfi2vy",
    remaining: 42,
    cards: [
      {
        suit: "CLUBS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "7C",
        value: "7"
      },
      {
        suit: "SPADES",
        images: {
          png: img,
          svg: img
        },
        img,
        code: "2S",
        value: "2"
      },
      {
        suit: "SPADES",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "4S",
        value: "4"
      },
      {
        suit: "SPADES",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "3S",
        value: "3"
      },
      {
        suit: "HEARTS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "4H",
        value: "4"
      },
      {
        suit: "CLUBS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "AC",
        value: "ACE"
      },
      {
        suit: "CLUBS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "3C",
        value: "3"
      },
      {
        suit: "HEARTS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "0H",
        value: "10"
      },
      {
        suit: "DIAMONDS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "KD",
        value: "KING"
      },
      {
        suit: "DIAMONDS",
        images: {
          png: img,
          svg: img
        },
        image: img,
        code: "4D",
        value: "4"
      }
    ]
  };

  it("creates GAME_STARTING immediately", () => {
    mockAxios.onGet(`${API.URL}/api/deck/new/shuffle/?deck_count=1`).reply(
      200,
      {
        success: true,
        deck_id: "066wgqtfi2vy",
        shuffled: true,
        remaining: 52
      },
      { "Content-type": "application/json" }
    );

    mockAxios
      .onGet(`${API.URL}/api/deck/066wgqtfi2vy/draw/?count=10`)
      .reply(200, apiResponse, { "Content-type": "application/json" });

    return store
      .dispatch(actions.startGame(2))
      .then(() =>
        expect(store.getActions()).toEqual([{ type: ACTIONS.GAME_STARTING }])
      );
  });

  it("handles network error", () => {
    mockAxios
      .onGet(`${API.URL}/api/deck/new/shuffle/?deck_count=1`)
      .networkError();

    return store.dispatch(actions.startGame(2)).then(() =>
      expect(store.getActions()).toEqual([
        { type: ACTIONS.GAME_STARTING },
        {
          type: ACTIONS.NOTIFY_NETWORK_ERROR,
          error: Error("Network Error")
        },
        { type: ACTIONS.RESTART_GAME }
      ])
    );
  });
});
