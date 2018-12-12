import {
	GET_SETUP_SUCCESS,
	GET_SETUP_FAILED,
} from '../../constants/reduxConstants';

const initialStateSetup = {
	setup: [],
	error: ''
}

export const setupReducer = (state=initialStateSetup, action={}) => {
	switch(action.type) {
		case GET_SETUP_SUCCESS:
			return Object.assign({}, state, { setup: action.payload});
		case GET_SETUP_FAILED:
			return Object.assign({}, state, { error: action.payload});
		default:
			return state;
	}
}