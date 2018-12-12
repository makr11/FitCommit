import { combineReducers } from 'redux'

import { usersReducer } from './usersR';
import { servicesReducer } from './servicesR';
import { userProfileReducer } from './userProfileR';
import { userRecordsReducer } from './userRecordsR';
import { arrivalsByDateReducer } from './arrivalsR';
import { setupReducer } from './setupR';

const rootReducers = combineReducers({
  setupReducer,
  usersReducer,
  servicesReducer,
  userRecordsReducer,
  userProfileReducer,
  arrivalsByDateReducer,
});

export default rootReducers;