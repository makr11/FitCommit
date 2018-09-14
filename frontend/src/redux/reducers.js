import {
    ON_FORM_CHANGE,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_FAILED,
    REQUEST_USER_PROFILE_RESET,
    REQUEST_USER_PROFILE_SUCCESS,
    REQUEST_USER_PROFILE_FAILED,
    REQUEST_GET_SERVICES_SUCCESS,
    REQUEST_GET_SERVICES_FAILED,
    } from './constants';

export const formAction = (state={}, action={}) => {
    switch(action.type) {
        case ON_FORM_CHANGE:
          return Object.assign({}, state, action.payload);
            
        default:
          return state  
    }   
}

const initialStateUsers = {
    users: [],
    error: ''
}

export const requestUsersReducer = (state=initialStateUsers, action={}) => {
    switch(action.type) {
        case REQUEST_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.payload});
        case REQUEST_USERS_FAILED:
            return Object.assign({}, state, { error: action.payload});
        default:
            return state;   
    }
}

const initialStateProfile = {
    userProfile: [],
    error: ''
}


export const userProfile = (state=initialStateProfile, action={}) => {
    switch(action.type) {
        case REQUEST_USER_PROFILE_RESET:
            return Object.assign({}, state, {profile: state});
        case REQUEST_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, { profile: action.payload});
        case REQUEST_USER_PROFILE_FAILED:
            return Object.assign({}, state, { error: action.payload});
        default:
            return state;   
    }
}

const initialStateServices = {
    services: [],
    error: ''
}

export const requestServicesReducer = (state=initialStateServices, action={}) => {
    switch(action.type) {
        case REQUEST_GET_SERVICES_SUCCESS:
            return Object.assign({}, state, { services: action.payload});
        case REQUEST_GET_SERVICES_FAILED:
            return Object.assign({}, state, { error: action.payload});
        default:
            return state;   
    }
}