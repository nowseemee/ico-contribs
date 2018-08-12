import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";

import * as actions from "./actions";
import * as types from "./actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  describe("sync", () => {
    test("fetchContributorsRequest", () => {
      expect(actions.fetchContributorsRequest()).toMatchSnapshot();
    });

    test("fetchContributorsSuccess", () => {
      expect(
        actions.fetchContributorsSuccess({ preIco: [], ico: [] })
      ).toMatchSnapshot();
    });

    test("fetchContributorsFailure", () => {
      expect(
        actions.fetchContributorsFailure(new Error("wtf?"))
      ).toMatchSnapshot();
    });
  });

  describe("async", () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });
    describe("fetchContributors", () => {
      test("creates FETCH_CONTRIBUTORS_SUCCESS when fetching has been done", () => {
        const body = { happy: "true" };
        fetchMock.getOnce("/api/inputs", {
          body,
          headers: { "content-type": "application/json" }
        });
        const expectedActions = [
          { type: types.FETCH_CONTRIBUTORS_REQUEST },
          {
            type: types.FETCH_CONTRIBUTORS_SUCCESS,
            body
          }
        ];
        const store = mockStore();
        return store.dispatch(actions.fetchContributors()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
