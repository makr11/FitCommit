import {
    INPUT_CHANGE,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILED,
    GET_USER_RECORDS_SUCCESS,
    GET_USER_RECORDS_FAILED,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_FAILED,
    GET_ARRIVALS_BY_DATE_SUCCESS,
    GET_ARRIVALS_BY_DATE_FAILED,
    POST_SERVICE_FAILED,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
    POST_RECORD_FAILED,
    PATCH_RECORD_SUCCESS,
    PATCH_RECORD_FAILED,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_RECORD_SUCCESS,
    DELETE_ARRIVAL_SUCCESS,
    RESET_PROFILE,
    RESET_RECORDS,
} from './constants';

import {
  users,
  services,
  categories,
  options,
  records,
  userRecords,
  arrivals
} from './apiUrls';

export const onFormChangeFields = (obj) => ({
  type: INPUT_CHANGE,
  payload: obj,
});

export const requestUsers = () => (dispatch) => {
  fetch(users)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_USERS_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_USERS_FAILED, payload: error}))
}

export const requestUserProfile = (id) => (dispatch) => {
  fetch(users + id)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_USER_PROFILE_FAILED, payload: error}))
};

export const requestUserRecords = (id) => (dispatch) => {
  fetch(userRecords + id)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_USER_RECORDS_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_USER_RECORDS_FAILED, payload: error}))
};

export const requestServices = () => (dispatch) => {
  fetch(services)
  .then(response => response.json())
  .then(data => dispatch({type: GET_SERVICES_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_SERVICES_FAILED, payload: error}));
};

export const requestArrivalsByDate = (date) => (dispatch) => {
  fetch(arrivals + date)
  .then(response => response.json())
  .then(data => dispatch({ type: GET_ARRIVALS_BY_DATE_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: GET_ARRIVALS_BY_DATE_FAILED, payload: error}))
};

export const submitFormService = (lead) => (dispatch) => {
  console.log(lead);
  let url = undefined;

  if (lead.name==="service"){
    url = services;
  } else if (lead.name==="category"){
    url = categories;
    lead["serviceID"] = lead.service.id;
    delete lead.service;
  } else if (lead.name==="option"){
    url = options;
    delete lead.service;
    lead["categoryID"] = lead.category.id;
    delete lead.category;
  };

  delete lead.name;

  const conf = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(lead),
    }

  fetch(url, conf)
  .then(response => {
    console.log(response);
    dispatch(requestServices());
  })
  .catch(error => dispatch({ type: POST_SERVICE_FAILED, payload: error}));
}

export const updateFormService = (lead) => (dispatch) => {
  console.log(lead.service);
  let leadUpdate = {};
  let url = undefined;
  let id = lead.id;

  if (lead.name==="serviceUpdate"){
    leadUpdate["service"]=lead.service;
    url = services;
  } else if (lead.name==="categoryUpdate"){
    leadUpdate["category"]=lead.category;
    url = categories;
  } else if (lead.name==="optionUpdate"){
    leadUpdate["arrivals"]=lead.arrivals;
    leadUpdate["price"]=lead.price;
    leadUpdate["duration"]=lead.duration;
    url = options;
  };

  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  fetch(url + id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: PUT_SERVICE_SUCCESS, payload: response})
    dispatch(requestServices());
  })
  .catch(error => dispatch({ type: PUT_SERVICE_FAILED, payload: error}));
};

export const submitFormRecord = (lead) => (dispatch, getState) => {
  let url = records;

  const conf = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };
  fetch(url, conf)
  .then(response => {
    console.log(response);
    const state = getState();
    dispatch(requestUserRecords(state.userProfileReducer.profile.id));
  })
  .catch(error => dispatch({ type: POST_RECORD_FAILED, payload: error}));
}

export const updateFormRecord = (id, index, lead) => (dispatch, getState) => {
  const state = getState()
  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  fetch(records + id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: PATCH_RECORD_SUCCESS, index, lead, state})
  })
  .catch(error => {
    console.log(error);
    dispatch({type: PATCH_RECORD_FAILED})
  })
}

export const removeInstance = (id, name) => (dispatch, getState) => {
  let deleted = true;
  const lead = { id, deleted };
  let url = undefined;
  let type = undefined;
  let state = getState();

  const conf = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead),
  };

  switch(name){
    case ('service'):
      url = services;
      break;
    case ('category'):
      url = categories;
      break;
    case ('option'):
      url = options;
      break;
    case ('record'):
      url = records;
      type = REMOVE_USER_RECORD_SUCCESS;
      break;
    case ('user'):
      url = users;
      type = REMOVE_USER_SUCCESS;
      break;
    default:
      break;
  };

  fetch(url + lead.id, conf)
  .then(response => {
    console.log(response);
    (!type)?dispatch(requestServices()):dispatch({type: type, name, lead, state})
    }
  )
  .catch(error => console.log(error));
}

export const deleteInstance = (name, id) => (dispatch, getState) => {
  let url = undefined;
  let type = undefined;
  let state = getState();

  const conf = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  switch(name){
    case ('arrival'):
      url = 'http://localhost:8000/api/arrival/';
      type = DELETE_ARRIVAL_SUCCESS;
      break;
    default:
      break;
  };

  fetch(url + id, conf)
  .then(response => {
    console.log(response);
    dispatch({type: type, id, name, state})
    }
  )
  .catch(error => console.log(error));
}

export const reset = (name) => {
  switch(name){
    case ('profile'):
      return {type: RESET_PROFILE}
    case ('records'):
      return {type: RESET_RECORDS}
    default:
      break
  }
};

export const submitFormArrival = (lead) => (dispatch) => {
  console.log(lead);
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
