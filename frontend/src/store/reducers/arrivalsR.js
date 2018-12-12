import {
	GET_ARRIVALS_BY_DATE_SUCCESS,
	GET_ARRIVALS_BY_DATE_FAILED,
	DELETE_ARRIVAL_SUCCESS,
} from '../../constants/reduxConstants';

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