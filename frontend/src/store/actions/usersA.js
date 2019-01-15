import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  REMOVE_USER_SUCCESS,
} from '../../constants/reduxConstants';

import {
  users,
} from '../../constants/apiUrls';

export const requestUsers = () => (dispatch) => {
  fetch(users)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_USERS_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_USERS_FAILED, payload: error}))
}

export const submitUserForm = (lead) => (dispatch) => {

  const conf = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(lead),
  };
  fetch(users, conf)
  .then(response => {
    console.log(response)
    dispatch(requestUsers());
  });
};

export const removeUser = (id) => (dispatch, getState) => {
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

  fetch(users + lead.id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: REMOVE_USER_SUCCESS, lead, state})
    }
  )
  .catch(error => console.log(error));
}