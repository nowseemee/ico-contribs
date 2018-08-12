// @flow
import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";
import type { Actions, Phases } from "./actions";

type contributorsInitialStateType = {
  isLoading: boolean,
  error: Error | null,
  body: Phases
};

export const contributorsInitialState: contributorsInitialStateType = {
  isLoading: false,
  error: null,
  body: { preIco: [], ico: [], finalIco: [] }
};

export const contributors = (
  state: contributorsInitialStateType = contributorsInitialState,
  action: Actions
) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTRIBUTORS_REQUEST:
      return {
        ...state,
        isLoading: true,
        body: contributorsInitialState.body,
        error: null
      };
    case actionTypes.FETCH_CONTRIBUTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        body: action.body,
        error: null
      };
    case actionTypes.FETCH_CONTRIBUTORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        body: contributorsInitialState.body,
        error: action.error
      };
    default:
      return state;
  }
};

export type Store = {
  contributors: contributorsInitialStateType
};
export default combineReducers({
  contributors
});
