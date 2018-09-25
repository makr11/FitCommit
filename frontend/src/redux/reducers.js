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
    DELETE_USER_SUCCESS,
    DELETE_USER_RECORD_SUCCESS,
    RESET_PROFILE,
    RESET_RECORDS,
    } from './constants';

export const formInput = (state={}, action={}) => {
    switch(action.type) {
        case INPUT_CHANGE:
          return Object.assign({}, state, action.payload);
            
        default:
          return state  
    }   
}

const initialStateUsers = {
    users: {},
    error: ''
}

export const usersReducer = (state=initialStateUsers, action={}) => {
    switch(action.type) {
        case GET_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.payload});
        case GET_USERS_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case DELETE_USER_SUCCESS:
            const users = action.state.usersReducer.users.filter(record => record.id !== parseInt(action.targetID, 10));
            state = {
                ...action.state.users,
                users: users,  
            };
            return state;
        default:
            return state;   
    }
}

const initialStateProfile = {
    profile: {},
    error: ''
}

export const userProfileReducer = (state=initialStateProfile, action={}) => {
    switch(action.type) {
        case GET_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, { profile: action.payload});
        case GET_USER_PROFILE_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case RESET_PROFILE:
            return {}
        default:
            return state;   
    }
}

const initialStateUserRecords = {
    records: {},
    error: ''
}

export const userRecordsReducer = (state=initialStateUserRecords, action={}) => {
    switch(action.type) {
        case GET_USER_RECORDS_SUCCESS:
            return Object.assign({}, state, { records: action.payload});
        case GET_USER_RECORDS_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case DELETE_USER_RECORD_SUCCESS:
            const records = action.state.userRecordsReducer.records.filter(record => record.id !== parseInt(action.targetID, 10));
            state = {
                ...action.state.userRecords,
                records: records,  
            };
            return state;
        case RESET_RECORDS:
            return {}
        default:
            return state;   
    }
}

const initialStateServices = {
    services: {},
    error: ''
};

export const servicesReducer = (state=initialStateServices, action={}) => {
    switch(action.type) {
        case GET_SERVICES_SUCCESS:
            return Object.assign({}, state, { services: action.payload});
        case GET_SERVICES_FAILED:
            return Object.assign({}, state, { error: action.payload});    
        default:
            return state;   
    }
};