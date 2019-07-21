import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  CLEAR_USER_PROFILE
} from "../../constants/reduxConstants";

import { refreshToken } from "./authenticationA";

import { users } from "../../constants/apiUrls";

export const requestUserProfile = id => dispatch => {
  if (id) {
    const conf = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    fetch(users + id, conf)
      .then(response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestUserProfile, id));
        } else {
          return response.json();
        }
      })
      .then(data => dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data }))
      .catch(error =>
        dispatch({ type: GET_USER_PROFILE_FAILED, payload: error })
      );
  } else {
    dispatch({ type: CLEAR_USER_PROFILE });
  }
};
