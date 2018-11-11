import { combineReducers } from 'redux'

import { usersReducer } from './usersReducers';
import { servicesReducer } from './servicesReducers';
import { userProfileReducer } from './userProfileReducers';
import { userRecordsReducer } from './userRecordsReducers';
import { arrivalsByDateReducer } from './arrivalsReducers';

export const rootReducers = combineReducers({
  usersReducer,
  servicesReducer,
  userRecordsReducer,
  userProfileReducer,
  arrivalsByDateReducer,
});