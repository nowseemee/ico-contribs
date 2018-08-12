import {
  FETCH_CONTRIBUTORS_REQUEST,
  FETCH_CONTRIBUTORS_SUCCESS,
  FETCH_CONTRIBUTORS_FAILURE
} from "./actionTypes";

export const fetchContributorsRequest = () => ({
  type: FETCH_CONTRIBUTORS_REQUEST
});

export const fetchContributorsSuccess = body => ({
  type: FETCH_CONTRIBUTORS_SUCCESS,
  body
});

export const fetchContributorsFailure = error => ({
  type: FETCH_CONTRIBUTORS_FAILURE,
  error
});

export const fetchContributors = () => dispatch => {
  dispatch(fetchContributorsRequest());
  return fetch("/api/inputs")
    .then(res => res.json())
    .then(body => dispatch(fetchContributorsSuccess(body)))
    .catch(error => dispatch(fetchContributorsFailure(error)));
};
