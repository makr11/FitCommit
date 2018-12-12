import {
	GET_SETUP_SUCCESS,
	GET_SETUP_FAILED,
} from '../../constants/reduxConstants';

import {
  setup,
} from '../../constants/apiUrls';

export const requestSetup = () => (dispatch) => {
	fetch(setup)
	.then(response => response.json())
	.then(data => dispatch({ type: GET_SETUP_SUCCESS, payload: data}))
	.catch(error => dispatch({ type: GET_SETUP_FAILED, payload: error}))
}