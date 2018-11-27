import {
  GET_USER_RECORDS_ALL_SUCCESS,
	GET_USER_RECORDS_ALL_FAILED,
	GET_USER_RECORDS_ACTIVE_SUCCESS,
	GET_USER_RECORDS_ACTIVE_FAILED,
  RESET_RECORDS,
} from '../constants/reduxConstants';

const initialStateUserRecords = {
  records: [],
  error: ''
}

export const userRecordsReducer = (state=initialStateUserRecords, action={}) => {
  switch(action.type) {
		case GET_USER_RECORDS_ALL_SUCCESS:
			return Object.assign({}, state, { records: action.payload});
		case GET_USER_RECORDS_ACTIVE_SUCCESS:
			return Object.assign({}, state, { records: action.payload});
		case GET_USER_RECORDS_ALL_FAILED:
			return Object.assign({}, state, { error: action.payload});
		case GET_USER_RECORDS_ACTIVE_FAILED:
			return Object.assign({}, state, { error: action.payload});
		case RESET_RECORDS:
			return {}
		default:
			return state;
  }
}