import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  CLEAR_USER_PROFILE,    
} from '../../constants/reduxConstants';

import {
  users,
} from '../../constants/apiUrls';

export const requestUserProfile = (id) => (dispatch) => {
  if(id){
    fetch(users + id)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_USER_PROFILE_FAILED, payload: error}))
  }else{
    dispatch({ type: CLEAR_USER_PROFILE });
  } 
};
