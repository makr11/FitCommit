import {
	GET_ARRIVALS_BY_DATE_SUCCESS,
	GET_ARRIVALS_BY_DATE_FAILED,
	GET_ARRIVALS_BY_RECORD_SUCCESS,
	GET_ARRIVALS_BY_RECORD_FAILED,
	CLEAR_ARRIVALS_BY_RECORD,
	DELETE_ARRIVAL_SUCCESS,
} from '../../constants/reduxConstants';

import {
	arrivals,
	arrivalsDate,
	arrivalsRecord,
	arrival,
} from '../../constants/apiUrls';

export const requestArrivalsByDate = (date) => (dispatch) => {
	
	fetch(arrivalsDate + date)
	.then(response => response.json())
	.then(data => dispatch({ type: GET_ARRIVALS_BY_DATE_SUCCESS, payload: data}))
	.catch(error => dispatch({ type: GET_ARRIVALS_BY_DATE_FAILED, payload: error}))
};

export const requestArrivalsByRecord = (record) => (dispatch) => {
	if(record){
		fetch(arrivalsRecord + record)
		.then(response => response.json())
		.then(data => dispatch({ type: GET_ARRIVALS_BY_RECORD_SUCCESS, payload: data}))
		.catch(error => dispatch({ type: GET_ARRIVALS_BY_RECORD_FAILED, payload: error}))
	}else{
		dispatch({type: CLEAR_ARRIVALS_BY_RECORD})
	}
}

export const submitFormArrival = (lead) => (dispatch) => {
	
	const conf = {
		method: "POST",
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(lead),
	};

	fetch(arrivals, conf)
	.then(response => {
		console.log(response);
		dispatch(requestArrivalsByDate(lead.date))
	})
	.catch(error => {
		console.log(error)
	});
};

export const deleteArrival = (id) => (dispatch, getState) => {
  let state = getState();

  const conf = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  fetch(arrival + id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: DELETE_ARRIVAL_SUCCESS, id, state})
    }
  )
  .catch(error => console.log(error));
}