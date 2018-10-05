import {
    INPUT_CHANGE,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILED,
    GET_USER_RECORDS_SUCCESS,
    GET_USER_RECORDS_FAILED,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_FAILED,
    GET_ARRIVALS_BY_DATE_SUCCESS,
    GET_ARRIVALS_BY_DATE_FAILED,
    POST_SERVICE_FAILED,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
    POST_RECORD_FAILED,
    PATCH_RECORD_SUCCESS,
    PATCH_RECORD_FAILED,
    DELETE_USER_SUCCESS,
    DELETE_USER_RECORD_SUCCESS,
    RESET_PROFILE,
    RESET_RECORDS,
} from './constants';

import {
    users,
    services,
    categories,
    options,
    records,
    userRecords,
    arrivals
} from './apiUrls';

export const onFormChangeFields = (obj) => ({
    type: INPUT_CHANGE,
    payload: obj,
});

export const requestUsers = () => (dispatch) => {
    fetch(users)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_USERS_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_USERS_FAILED, payload: error}))
}

export const requestUserProfile = (id) => (dispatch) => {
    fetch(users + id)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_USER_PROFILE_FAILED, payload: error}))
};

export const requestUserRecords = (id) => (dispatch) => {
    fetch(userRecords + id)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_USER_RECORDS_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_USER_RECORDS_FAILED, payload: error}))
};

export const requestServices = () => (dispatch) => {
    fetch(services)
    .then(response => response.json())
    .then(data => dispatch({type: GET_SERVICES_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_SERVICES_FAILED, payload: error}));
};

export const requestArrivalsByDate = (date) => (dispatch) => {
    fetch(arrivals + date)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_ARRIVALS_BY_DATE_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: GET_ARRIVALS_BY_DATE_FAILED, payload: error}))
};

export const submitFormService = (lead) => (dispatch) => {
    let url = undefined;

    if (lead.categoryID!==undefined){
        url = options
    } else if (lead.serviceID!==undefined){
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
        dispatch(requestServices());
    })
    .catch(error => dispatch({ type: POST_SERVICE_FAILED, payload: error}));
}

export const updateFormService = (lead) => (dispatch) => {
    let url = undefined;

    if (lead.optionID!==undefined){
        url = options + lead.optionID
    } else if (lead.categoryID!==undefined){
        url = categories + lead.categoryID
    } else if (lead.serviceID!==undefined){
        url = services + lead.serviceID
    };

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
        dispatch({type: PUT_SERVICE_SUCCESS, payload: response})
        dispatch(requestServices());
    })
    .catch(error => dispatch({ type: PUT_SERVICE_FAILED, payload: error}));
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
}

export const removeInstance = (id, name) => (dispatch, getState) => {
    let deleted = true;
    const lead = { id, deleted };
    let url = undefined;
    let type = undefined;
    let state = getState();

    const conf = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead),
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
            type = DELETE_USER_RECORD_SUCCESS;
            break;
        case ('user'):
            url = users;
            type = DELETE_USER_SUCCESS;
            break;
        default:
            break;
    };

    fetch(url + lead.id, conf)
    .then(response => {
        console.log(response);
        dispatch({type: type, name, lead, state})
        }
    )
    .catch(error => console.log(error));
}

export const reset = (name) => {
    switch(name){
        case ('profile'):
            return {type: RESET_PROFILE}
        case ('records'):
            return {type: RESET_RECORDS}
        default:
            break
    }
};

export const submitFormArrival = (lead) => (dispatch) => {
    const conf = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead),
    };
    fetch(arrivals, conf)
    .then(response => {
        console.log(response);
        dispatch(requestArrivalsByDate(lead.date))
    })
    .catch(error => {
        console.log(error)
    });
};