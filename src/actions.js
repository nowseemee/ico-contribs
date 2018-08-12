// @flow
import type { Dispatch } from "redux";
import {
  FETCH_CONTRIBUTORS_REQUEST,
  FETCH_CONTRIBUTORS_SUCCESS,
  FETCH_CONTRIBUTORS_FAILURE
} from "./actionTypes";

import type {
  FETCH_CONTRIBUTORS_REQUEST_TYPE,
  FETCH_CONTRIBUTORS_SUCCESS_TYPE,
  FETCH_CONTRIBUTORS_FAILURE_TYPE
} from "./actionTypes";

export type FetchContributorsRequestType = {
  type: FETCH_CONTRIBUTORS_REQUEST_TYPE
};

export type Phases = {
  preIco: *[],
  ico: *[],
  finalIco: *[]
};

type FetchContributorsSuccessType = {
  type: FETCH_CONTRIBUTORS_SUCCESS_TYPE,
  body: Phases
};

type FetchContributorsFailureType = {
  type: FETCH_CONTRIBUTORS_FAILURE_TYPE,
  error: Error
};

type NoopType = { type: "NOOP" };

export type Actions =
  | FetchContributorsRequestType
  | FetchContributorsSuccessType
  | FetchContributorsFailureType
  | NoopType;

export const fetchContributorsRequest = () => ({
  type: FETCH_CONTRIBUTORS_REQUEST
});

export const fetchContributorsSuccess = (body: Phases) => ({
  type: FETCH_CONTRIBUTORS_SUCCESS,
  body
});

export const fetchContributorsFailure = (error: Error) => ({
  type: FETCH_CONTRIBUTORS_FAILURE,
  error
});

export const fetchContributors = () => (
  dispatch: Dispatch<
    | FetchContributorsRequestType
    | FetchContributorsSuccessType
    | FetchContributorsFailureType
  >
) => {
  dispatch(fetchContributorsRequest());
  return fetch("/api/inputs")
    .then(res => res.json())
    .then((body: Phases) => dispatch(fetchContributorsSuccess(body)))
    .catch((error: Error) => dispatch(fetchContributorsFailure(error)));
};
