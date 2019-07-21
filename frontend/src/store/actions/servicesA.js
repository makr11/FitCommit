import {
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILED,
  POST_SERVICE_FAILED,
  PATCH_SERVICE_SUCCESS,
  PATCH_SERVICE_FAILED
} from "../../constants/reduxConstants";

import { services, categories, options } from "../../constants/apiUrls";
import { refreshToken } from "./authenticationA";

export const requestServices = () => dispatch => {
  const conf = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    }
  };
  fetch(services, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(requestServices, null));
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch({ type: GET_SERVICES_SUCCESS, payload: data });
    })
    .catch(error => dispatch({ type: GET_SERVICES_FAILED, payload: error }));
};

export const submitFormService = lead => dispatch => {
  let url = "";

  if (lead.name === "new") {
    url = services;
  } else if (lead.name === "service") {
    url = categories;
    lead["serviceID"] = lead.id;
  } else if (lead.name === "category") {
    url = options;
    lead["categoryID"] = lead.id;
  }

  delete lead.name;
  delete lead.id;

  const conf = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  fetch(url, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(submitFormService, lead));
      } else {
        dispatch(requestServices());
      }
    })
    .catch(error => dispatch({ type: POST_SERVICE_FAILED, payload: error }));
};

export const updateFormService = lead => dispatch => {
  let leadUpdate;
  let url = undefined;
  let id = lead.id;

  if (lead.name === "service") {
    leadUpdate = { service: lead.service };
    url = services;
  } else if (lead.name === "category") {
    leadUpdate = { category: lead.category };
    url = categories;
  } else if (lead.name === "option") {
    leadUpdate = {
      arrivals: parseInt(lead.arrivals, 10),
      price: parseInt(lead.price, 10),
      duration: parseInt(lead.duration, 10)
    };
    url = options;
  }

  const conf = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(leadUpdate)
  };

  fetch(url + id, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(updateFormService, leadUpdate));
      } else {
        dispatch(requestServices());
      }
    })
    .catch(error => dispatch({ type: PATCH_SERVICE_FAILED, payload: error }));
};

export const removeServices = (id, name) => dispatch => {
  let url;
  const lead = { id };

  const conf = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(lead)
  };

  switch (name) {
    case "service":
      url = services;
      break;
    case "category":
      url = categories;
      break;
    case undefined:
      url = options;
      break;
    default:
      break;
  }

  fetch(url + lead.id, conf)
    .then(response => {
      if (response.status === 401) {
        dispatch(refreshToken(removeServices, lead));
      } else {
        dispatch(requestServices());
      }
    })
    .catch(error => console.log(error));
};
