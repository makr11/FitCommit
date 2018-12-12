import {
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
	REMOVE_USER_SUCCESS,
} from '../../constants/reduxConstants';

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