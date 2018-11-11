import {
  GET_USER_RECORDS_SUCCESS,
  GET_USER_RECORDS_FAILED,
  POST_RECORD_FAILED,
  PATCH_RECORD_SUCCESS,
  PATCH_RECORD_FAILED,
  REMOVE_USER_RECORD_SUCCESS,
  RESET_RECORDS,
} from '../constants/reduxConstants';

import {
  records,
  userRecords,
} from '../constants/apiUrls';

export const requestUserRecords = (id) => (dispatch) => {
  fetch(userRecords + id)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_USER_RECORDS_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_USER_RECORDS_FAILED, payload: error}))
};

export const submitFormRecord = (lead) => (dispatch, getState) => {
  let url = records;

  const conf = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };
  fetch(url, conf)
  .then(response => {
    console.log(response);
    const state = getState();
    dispatch(requestUserRecords(state.userProfileReducer.profile.id));
  })
  .catch(error => dispatch({ type: POST_RECORD_FAILED, payload: error}));
}

export const updateFormRecord = (id, index, lead) => (dispatch, getState) => {
  const state = getState()
  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  fetch(records + id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: PATCH_RECORD_SUCCESS, index, lead, state})
  })
  .catch(error => {
    console.log(error);
    dispatch({type: PATCH_RECORD_FAILED})
  })
};

export const removeRecord = (id) => (dispatch, getState) => {
  let deleted = true;
  const lead = { id, deleted };
  let state = getState();

  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  fetch(userRecords + lead.id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: REMOVE_USER_RECORD_SUCCESS, lead, state})
    }
  )
  .catch(error => console.log(error));
}

export const resetRecords = () => {
  return {type: RESET_RECORDS}
};