import {
  REQUEST_ARRIVALS_BY_DATE,
  GET_ARRIVALS_BY_DATE_SUCCESS,
  GET_ARRIVALS_BY_DATE_FAILED,
  CLEAR_ARRIVALS_BY_DATE,
  GET_ARRIVALS_BY_RECORD_SUCCESS,
  GET_ARRIVALS_BY_RECORD_FAILED,
  CLEAR_ARRIVALS_BY_RECORD
  // DELETE_ARRIVAL_SUCCESS,
} from "../../constants/reduxConstants";

import { refreshToken } from "./authenticationA";

import {
  arrivals,
  arrivalsDate,
  arrivalsRecord,
  arrival
} from "../../constants/apiUrls";

export const requestArrivalsByDate = date => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };

  if (date) {
    fetch(arrivalsDate + date, conf)
      .then(dispatch({ type: REQUEST_ARRIVALS_BY_DATE }))
      .then(response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestArrivalsByDate, date));
        } else {
          return response.json();
        }
      })
      .then(data =>
        dispatch({ type: GET_ARRIVALS_BY_DATE_SUCCESS, payload: data })
      )
      .catch(error =>
        dispatch({ type: GET_ARRIVALS_BY_DATE_FAILED, payload: error })
      );
  } else {
    dispatch({ type: CLEAR_ARRIVALS_BY_DATE });
  }
};

export const requestArrivalsByRecord = record => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  if (record) {
    fetch(arrivalsRecord + record, conf)
      .then(response => {
        if (response.status === 401) {
          dispatch(refreshToken(requestArrivalsByRecord, record));
        } else {
          return response.json();
        }
      })
      .then(data =>
        dispatch({ type: GET_ARRIVALS_BY_RECORD_SUCCESS, payload: data })
      )
      .catch(error =>
        dispatch({ type: GET_ARRIVALS_BY_RECORD_FAILED, payload: error })
      );
  } else {
    dispatch({ type: CLEAR_ARRIVALS_BY_RECORD });
  }
};

export const submitFormArrival = lead => dispatch => {
  const conf = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  fetch(arrivals, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(submitFormArrival, lead));
      } else {
        dispatch(requestArrivalsByDate(lead.date));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteArrival = (id, date, req) => (dispatch /*, getState*/) => {
  // let state = getState();

  const conf = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };

  fetch(arrival + id, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(deleteArrival, { id, date, req }));
      } else {
        if (req) {
          dispatch(requestArrivalsByDate(date));
        }
      }
    })
    .catch(error => console.log(error));
};
