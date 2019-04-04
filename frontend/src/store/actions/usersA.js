import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
} from '../../constants/reduxConstants';

import { requestUserProfile } from './userProfileA';

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
  console.log(lead)
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

export const editUserForm = (lead, id) => (dispatch) => {
  
  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(lead),
  };
  fetch(users + id, conf)
  .then(response => {
    console.log(response)
    dispatch(requestUserProfile(id));
  });
};

export const removeUser = (id, req) => (dispatch) => {
  console.log(id, req)
  const conf = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  fetch(users + id, conf)
  .then(response => {
    console.log(response);
    if(req){
      dispatch(requestUsers())
    }}
  )
  .catch(error => console.log(error));
}