import {
    ON_FORM_CHANGE_NEW_MEMBER,
    ON_FORM_CHANGE_NEW_SERVICE,
    REQUEST_MEMBERS_SUCCESS,
    REQUEST_MEMBERS_FAILED,
    REQUEST_USER_PROFILE_RESET,
    REQUEST_USER_PROFILE_SUCCESS,
    REQUEST_USER_PROFILE_FAILED,
    
} from './constants';

export const formAction = (state={}, action={}) => {
    switch(action.type) {
        case ON_FORM_CHANGE_NEW_MEMBER:
          return Object.assign({}, state, action.payload);
        case ON_FORM_CHANGE_NEW_SERVICE:
          return Object.assign({}, state, action.payload);          
        default:
          return state  
    }   
}

const initialStateMembers = {
    members: [],
    error: ''
}

export const requestMembersRegistry = (state=initialStateMembers, action={}) => {
    switch(action.type) {
        case REQUEST_MEMBERS_SUCCESS:
            return Object.assign({}, state, { members: action.payload});
        case REQUEST_MEMBERS_FAILED:
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