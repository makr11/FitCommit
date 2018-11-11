import {
  GET_USER_RECORDS_SUCCESS,
  GET_USER_RECORDS_FAILED,
  PATCH_RECORD_SUCCESS,
  REMOVE_USER_RECORD_SUCCESS,
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
			return state
		case RESET_RECORDS:
			return {}
		default:
			return state;
  }
}