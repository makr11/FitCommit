import {
  GET_USER_RECORDS_ALL_SUCCESS,
  GET_USER_RECORDS_ALL_FAILED,
  GET_USER_RECORDS_ACTIVE_SUCCESS,
  GET_USER_RECORDS_ACTIVE_FAILED,
  POST_RECORD_SUCCESS,
  POST_RECORD_FAILED,
  PATCH_RECORD_SUCCESS,
  PATCH_RECORD_FAILED,
  CLEAR_USER_RECORDS
} from "../../constants/reduxConstants";

import { requestUserProfile } from "./userProfileA";

import {
  records,
  userRecordsAll,
  userRecordsActive
} from "../../constants/apiUrls";

import { refreshToken } from "./authenticationA";

export const requestUserRecordsAll = id => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  if (id) {
    fetch(userRecordsAll + id, conf)
      .then(response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestUserRecordsAll, id));
        } else {
          return response.json();
        }
      })
      .then(data =>
        dispatch({ type: GET_USER_RECORDS_ALL_SUCCESS, payload: data })
      )
      .catch(error =>
        dispatch({ type: GET_USER_RECORDS_ALL_FAILED, payload: error })
      );
  } else {
    dispatch({ type: CLEAR_USER_RECORDS });
  }
};

export const requestUserRecordsActive = id => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  if (id) {
    fetch(userRecordsActive + id, conf)
      .then(response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestUserRecordsActive, id));
        } else {
          return response.json();
        }
      })
      .then(data =>
        dispatch({ type: GET_USER_RECORDS_ACTIVE_SUCCESS, payload: data })
      )
      .catch(error =>
        dispatch({ type: GET_USER_RECORDS_ACTIVE_FAILED, payload: error })
      );
  } else {
    dispatch({ type: CLEAR_USER_RECORDS });
  }
};

export const submitFormRecord = lead => (dispatch, getState) => {
  let url = records;

  const conf = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };
  fetch(url, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(submitFormRecord, lead));
      } else {
        const state = getState();
        dispatch({
          type: POST_RECORD_SUCCESS
        });
        dispatch(requestUserRecordsAll(state.userProfileReducer.profile.id));
      }
    })
    .catch(error => {
      dispatch({
        type: POST_RECORD_FAILED,
        payload: error
      });
    });
};

export const updateFormRecord = (id, lead) => (dispatch, getState) => {
  console.log(lead);
  const state = getState();
  const conf = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  fetch(records + id, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(updateFormRecord, { id, lead }));
      } else {
        dispatch(requestUserRecordsAll(state.userProfileReducer.profile.id));
        dispatch(requestUserProfile(state.userProfileReducer.profile.id));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: PATCH_RECORD_FAILED
      });
    });
};

export const removeRecord = id => (dispatch, getState) => {
  const lead = { id };
  let state = getState();

  const conf = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  fetch(userRecordsAll + lead.id, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(removeRecord, id));
      } else {
        dispatch(requestUserRecordsAll(state.userProfileReducer.profile.id));
      }
    })
    .catch(error => {
      console.log(error);
    });
};
