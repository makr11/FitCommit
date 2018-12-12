import {
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_FAILED,
	RESET_PROFILE,
} from '../../constants/reduxConstants';

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