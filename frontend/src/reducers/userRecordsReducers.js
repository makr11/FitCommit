import {
  GET_USER_RECORDS_SUCCESS,
  GET_USER_RECORDS_FAILED,
  RESET_RECORDS,
} from '../constants/reduxConstants';

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
		case RESET_RECORDS:
			return {}
		default:
			return state;
  }
}