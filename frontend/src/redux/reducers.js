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
    PATCH_RECORD_SUCCESS,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_RECORD_SUCCESS,
    RESET_PROFILE,
    RESET_RECORDS,
    DELETE_ARRIVAL_SUCCESS,
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
    users: [],
    error: ''
}

export const usersReducer = (state=initialStateUsers, action={}) => {
    switch(action.type) {
        case GET_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.payload});
        case GET_USERS_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case REMOVE_USER_SUCCESS:
            const users = action.state.usersReducer.users.filter(record => record.id !== parseInt(action.lead.id, 10));
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
    profile: [],
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
    records: [],
    error: ''
}

export const userRecordsReducer = (state=initialStateUserRecords, action={}) => {
    switch(action.type) {
        case GET_USER_RECORDS_SUCCESS:
            return Object.assign({}, state, { records: action.payload});
        case GET_USER_RECORDS_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case REMOVE_USER_RECORD_SUCCESS:
            const records = action.state.userRecordsReducer.records.filter(record => record.id !== parseInt(action.lead.id, 10));
            state = {
                ...action.state.userRecords,
                records: records,
            };
            return state;
        case PATCH_RECORD_SUCCESS:
            let clonedRecords = action.state.userRecordsReducer.records.slice();
            clonedRecords[action.index].paid=(action.lead.paid) ? true:false;
            state = {
                ...action.state.userRecordsReducer,
                records: [...clonedRecords]
            };
            console.log(state);
            return state
        case RESET_RECORDS:
            return {}
        default:
            return state;
    }
}

const initialStateServices = {
    services: [],
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

const initArrivalsByDate = {
    arrivals: [],
    error: '',
}

export const arrivalsByDateReducer = (state=initArrivalsByDate, action={}) => {
    switch(action.type) {
        case GET_ARRIVALS_BY_DATE_SUCCESS:
            return Object.assign({}, state, {arrivals: action.payload})
        case GET_ARRIVALS_BY_DATE_FAILED:
            return Object.assign({}, state, { error: action.payload});
        case DELETE_ARRIVAL_SUCCESS:
            const arrivals = action.state.arrivalsByDateReducer.arrivals.filter(arrival => arrival.id !== parseInt(action.id, 10));
            state = {
                ...action.state.arrivals,
                arrivals: arrivals,
            };
            return state;
        default:
            return state;
    }
}
