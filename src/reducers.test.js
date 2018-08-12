import { contributors, contributorsInitialState } from "./reducers";
import * as actionTypes from "./actionTypes";
describe("reducers", () => {
  describe("Contributors", () => {
    test("initial state", () => {
      expect(contributors(undefined, {})).toEqual(contributorsInitialState);
    });

    describe("fetch", () => {
      test("request flips isLoading and resets error and body", () => {
        expect(
          contributors(
            {
              ...contributorsInitialState,
              isLoading: false,
              error: new Error("omg!"),
              body: "weird"
            },
            {
              type: actionTypes.FETCH_CONTRIBUTORS_REQUEST
            }
          )
        ).toEqual({ ...contributorsInitialState, isLoading: true });
      });

      test("success flips back isLoading, adds body and resets error", () => {
        const body = { happy: true };
        expect(
          contributors(
            {
              ...contributorsInitialState,
              isLoading: true,
              error: new Error("omg!")
            },
            {
              type: actionTypes.FETCH_CONTRIBUTORS_SUCCESS,
              body
            }
          )
        ).toEqual({
          ...contributorsInitialState,
          body
        });
      });

      test("failure flips back isLoading adds error and resets body", () => {
        const error = new Error("wtf?");
        expect(
          contributors(
            {
              ...contributorsInitialState,
              isLoading: true,
              body: "weird"
            },
            {
              type: actionTypes.FETCH_CONTRIBUTORS_FAILURE,
              error
            }
          )
        ).toEqual({
          ...contributorsInitialState,
          error
        });
      });
    });
  });
});
