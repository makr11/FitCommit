import {
    ON_FORM_CHANGE_NEW_MEMBER,
    REQUEST_MEMBERS_SUCCESS,
    REQUEST_MEMBERS_FAILED,
    REQUEST_USER_PROFILE_RESET,
    REQUEST_USER_PROFILE_SUCCESS,
    REQUEST_USER_PROFILE_FAILED,
    ON_FORM_CHANGE_NEW_SERVICE,
    REQUEST_POST_NEW_SERVICE_SUCCESS,
    REQUEST_POST_NEW_SERVICE_FAILED,
    REQUEST_GET_SERVICES_SUCCESS,
    REQUEST_GET_SERVICES_FAILED
} from './constants';

import {
    users,
    services,
} from './apiUrls';

export const onFormChangeFieldsNewMember = (obj) => ({
    type: ON_FORM_CHANGE_NEW_MEMBER,
    payload: obj,
});

export const onFormChangeFieldsNewService = (obj) => ({
    type: ON_FORM_CHANGE_NEW_SERVICE,
    payload: obj,
});

export const requestMembers = () => (dispatch) => {
    fetch(users)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MEMBERS_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: REQUEST_MEMBERS_FAILED, payload: error}))
}

export const requestUserProfile = (id) => (dispatch) => {
    if(id===undefined) {dispatch({type: REQUEST_USER_PROFILE_RESET})}
    else{
    const conf = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    
    fetch(users + id, conf)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_USER_PROFILE_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: REQUEST_USER_PROFILE_FAILED, payload: error}))
    }
};

export const requestServices = () => (dispatch) => {
    fetch(services)
    .then(response => response.json())
    .then(data => dispatch({type: REQUEST_GET_SERVICES_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: REQUEST_GET_SERVICES_FAILED, payload: error}));
}

export const onSubmitFormNewService = (conf) => (dispatch) => {
    fetch(services, conf)
    .then(response => {
        console.log(response);
        dispatch({type: REQUEST_POST_NEW_SERVICE_SUCCESS, payload: response})
    })
    .catch(error => dispatch({ type: REQUEST_POST_NEW_SERVICE_FAILED, payload: error}));
}