import {
    ON_FORM_CHANGE,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_FAILED,
    REQUEST_USER_PROFILE_RESET,
    REQUEST_USER_PROFILE_SUCCESS,
    REQUEST_USER_PROFILE_FAILED,
    REQUEST_POST_NEW_SERVICE_SUCCESS,
    REQUEST_POST_NEW_SERVICE_FAILED,
    REQUEST_UPDATE_OPTION_SUCCESS,
    REQUEST_UPDATE_OPTION_FAILED,
    REQUEST_GET_SERVICES_SUCCESS,
    REQUEST_GET_SERVICES_FAILED,
    ADD_RECORD_SUCCESS,
    ADD_RECORD_FAILED,
} from './constants';

import {
    users,
    services,
    categories,
    options,
    records
} from './apiUrls';

export const onFormChangeFields = (obj) => ({
    type: ON_FORM_CHANGE,
    payload: obj,
});

export const requestUsers = () => (dispatch) => {
    fetch(users)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_USERS_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error}))
}

export const requestServices = () => (dispatch) => {
    fetch(services)
    .then(response => response.json())
    .then(data => dispatch({type: REQUEST_GET_SERVICES_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: REQUEST_GET_SERVICES_FAILED, payload: error}));
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

export const onSubmitFormNewService = (lead) => (dispatch) => {
    let url = undefined;

    console.log(lead);
    if (lead.categoryID!==null){
        url = options
    } else if (lead.serviceID!==null){
        url = categories
    } else {
        url = services
    };

    const conf = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(lead),
        }

    fetch(url, conf)
    .then(response => {
        console.log(response);
        dispatch({type: REQUEST_POST_NEW_SERVICE_SUCCESS, payload: response});
        dispatch(requestServices());
    })
    .catch(error => dispatch({ type: REQUEST_POST_NEW_SERVICE_FAILED, payload: error}));
}

export const onUpdateFormOption = (lead) => (dispatch) => {
    let url = options + lead.optionID;

    const conf = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead),
    };

    fetch(url, conf)
    .then(response => {
        console.log(response);
        dispatch({type: REQUEST_UPDATE_OPTION_SUCCESS, payload: response})
        dispatch(requestServices());
    })
    .catch(error => dispatch({ type: REQUEST_UPDATE_OPTION_FAILED, payload: error}));
};

export const submitNewRecord = (lead) => (dispatch) => {
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
        dispatch({type: ADD_RECORD_SUCCESS, payload: response})
    })
    .catch(error => dispatch({ type: ADD_RECORD_FAILED, payload: error}));
}

export const deleteInstance = (id, name) => (dispatch) => {
    let targetID = id;
    let url = undefined;

    const conf = {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };

    switch(name){
        case ('service'):
            url = services;
            break;
        case ('category'):
            url = categories;
            break;
        case ('option'):
            url = options;
            break;
        case ('record'):
            url = records;
            break;
        case ('user'):
            url = users;
            break;
        default:
            break;
    };

    fetch(url + targetID, conf).then(response => console.log(response));
}