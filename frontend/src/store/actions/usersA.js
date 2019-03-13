import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
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
  const lead = { id };
  // let state = getState();

  const conf = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  fetch(users + lead.id, conf)
  .then(response => {
    console.log(response);
    dispatch(requestUsers())
    }
  )
  .catch(error => console.log(error));
}