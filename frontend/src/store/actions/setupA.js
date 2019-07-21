import {
  GET_SETUP_SUCCESS,
  GET_SETUP_FAILED
} from "../../constants/reduxConstants";

import { setup } from "../../constants/apiUrls";
import { refreshToken } from "./authenticationA";

export const requestSetup = () => dispatch => {
  console.log("in setup");
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  fetch(setup, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(requestSetup, null));
      } else {
        return response.json();
      }
    })
    .then(data => dispatch({ type: GET_SETUP_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: GET_SETUP_FAILED, payload: error }));
};
