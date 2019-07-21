import {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  LOGOUT_USER
} from "../../constants/reduxConstants";

export const authenticationReducer = (
  state = { isAuthenticated: false },
  action = {}
) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: true });
    case AUTHENTICATION_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isAuthenticated: false
      });
    case LOGOUT_USER:
      return Object.assign({}, state, { isAuthenticated: false });
    default:
      return state;
  }
};
