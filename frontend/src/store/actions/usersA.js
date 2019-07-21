import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED
} from "../../constants/reduxConstants";

import { requestUserProfile } from "./userProfileA";
import { refreshToken } from "./authenticationA";

import { users } from "../../constants/apiUrls";

export const requestUsers = () => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  fetch(users, conf)
    .then(
      response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestUsers, null));
        } else {
          return response.json();
        }
      },

      error => {
        dispatch({ type: GET_USERS_FAILED, payload: error });
      }
    )
    .then(data => {
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    });
};

export const submitUserForm = lead => dispatch => {
  const conf = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  fetch(users, conf).then(response => {
    console.log(response);
    dispatch(requestUsers());
  });
};

export const editUserForm = (lead, id) => dispatch => {
  const conf = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },

    body: JSON.stringify(lead)
  };
  fetch(users + id, conf).then(response => {
    console.log(response);
    dispatch(requestUserProfile(id));
  });
};

export const removeUser = (id, req) => dispatch => {
  console.log(id, req);
  const conf = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };

  fetch(users + id, conf)
    .then(response => {
      console.log(response);
      if (req) {
        dispatch(requestUsers());
      }
    })
    .catch(error => console.log(error));
};
