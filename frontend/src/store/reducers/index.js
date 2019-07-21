import { combineReducers } from "redux";

import { usersReducer } from "./usersR";
import { servicesReducer } from "./servicesR";
import { userProfileReducer } from "./userProfileR";
import { userRecordsReducer } from "./userRecordsR";
import { arrivalsByDateReducer, arrivalsByRecordReducer } from "./arrivalsR";
import { authenticationReducer } from "./authenticationR";
import { setupReducer } from "./setupR";

const rootReducers = combineReducers({
  authenticationReducer,
  setupReducer,
  usersReducer,
  servicesReducer,
  userRecordsReducer,
  userProfileReducer,
  arrivalsByDateReducer,
  arrivalsByRecordReducer
});

export default rootReducers;
