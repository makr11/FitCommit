import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../index";
import {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  LOGOUT_USER
} from "../../constants/reduxConstants";

import { authentication, refresh } from "../../constants/apiUrls";

export const authenticate = lead => dispatch => {
  const conf = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lead)
  };

  fetch(authentication, conf)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("access_token", data["access"]);
      localStorage.setItem("refresh_token", data["refresh"]);
      dispatch({ type: AUTHENTICATION_SUCCESS, payload: data });
    })
    .catch(error => dispatch({ type: AUTHENTICATION_FAILED, payload: error }));
};

export const logout = () => dispatch => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  purgeStoredState(persistConfig);
  dispatch({ type: LOGOUT_USER });
};

let REFRESHING = {};
let REFRESH = true;

export const refreshToken = (func, data) => dispatch => {
  REFRESHING[func.name] = func(data);

  if (REFRESH) {
    REFRESH = false;
    const conf = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refresh_token") })
    };
    fetch(refresh, conf)
      .then(response => {
        if (response.status === 401 || response.status === 400) {
          dispatch(logout());
        } else {
          return response.json();
        }
      })
      .then(data => {
        localStorage.setItem("access_token", data["access"]);
        Object.keys(REFRESHING).forEach(function(key) {
          dispatch(REFRESHING[key]);
        });
        REFRESHING = {};
        REFRESH = true;
      })
      .catch(error => logout());
  }
};
