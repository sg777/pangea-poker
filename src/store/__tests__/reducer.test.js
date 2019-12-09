import reducer from "../reducer";
import { addToHandHistory } from "../actions";
import state from "../initialState";
import initialState from "../initialState";

describe("reducer", () => {
  expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false
        };
      }
    }
  });

  test("handles addToHandHistory", () => {
    const action = {
      payload: "Player 1 has joined the table",
      type: "addToHandHistory"
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      handHistory: [
        {
          action: action.payload,
          timeStamp: expect.toBeWithinRange(Date.now() - 10, Date.now() + 10)
        }
      ]
    });
  });

  test("handles processControls", () => {
    const action = {
      payload: { canCheck: false, canRaise: false },
      type: "processControls"
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      controls: {
        ...initialState.controls,
        canCheck: false,
        canRaise: false
      }
    });
  });

  test("handles resetTurn", () => {
    const action = {
      payload: 100,
      type: "resetTurn"
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      chipsCollected: false,
      minRaiseTo: action.payload,
      isShowDown: false,
      players: {
        ...state.players,
        player1: {
          ...state.players.player1,
          isBetting: false,
          betAmount: 0,
          playerCards: []
        },
        player2: {
          ...state.players.player2,
          isBetting: false,
          betAmount: 0,
          playerCards: []
        }
      }
    });
  });
});