import {
	GET_ARRIVALS_BY_DATE_SUCCESS,
	GET_ARRIVALS_BY_DATE_FAILED,
	CLEAR_ARRIVALS_BY_DATE,
	GET_ARRIVALS_BY_RECORD_SUCCESS,
	GET_ARRIVALS_BY_RECORD_FAILED,
	CLEAR_ARRIVALS_BY_RECORD,
	DELETE_ARRIVAL_SUCCESS,
} from '../../constants/reduxConstants';

const initArrivalsByDate = {
	arrivals: [],
	error: '',
}

export const arrivalsByDateReducer = (state=initArrivalsByDate, action={}) => {
	switch(action.type) {
	case GET_ARRIVALS_BY_DATE_SUCCESS:
		return Object.assign({}, state, {arrivals: action.payload});
	case GET_ARRIVALS_BY_DATE_FAILED:
		return Object.assign({}, state, { error: action.payload});
	case CLEAR_ARRIVALS_BY_DATE:
		return initArrivalsByDate;
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

const initArrivalsByRecord = {
	arrivals: [],
	error: '',
}

export const arrivalsByRecordReducer = (state=initArrivalsByRecord, action={}) => {
	switch(action.type) {
		case GET_ARRIVALS_BY_RECORD_SUCCESS:
			return Object.assign({}, state, {arrivals: action.payload})
		case GET_ARRIVALS_BY_RECORD_FAILED:
			return Object.assign({}, state, {error: action.payload});
		case CLEAR_ARRIVALS_BY_RECORD:
			return initArrivalsByRecord
		default:
			return state;
	}
}