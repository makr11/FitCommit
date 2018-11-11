import {
	GET_SERVICES_SUCCESS,
	GET_SERVICES_FAILED,
	POST_SERVICE_FAILED,
	PUT_SERVICE_SUCCESS,
	PUT_SERVICE_FAILED,
} from '../constants/reduxConstants';

import {
	services,
	categories,
	options,
} from '../constants/apiUrls';

export const requestServices = () => (dispatch) => {
	fetch(services)
	.then(response => response.json())
	.then(data => dispatch({type: GET_SERVICES_SUCCESS, payload: data}))
	.catch(error => dispatch({ type: GET_SERVICES_FAILED, payload: error}));
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

export const removeServices = (id, name) => (dispatch) => {
	let deleted = true;
	let url;
	const lead = { id, deleted };

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
		default:
			break;
	}

	fetch(url + lead.id, conf)
	.then(response => {
		console.log(response);
		dispatch(requestServices());
		}
	)
	.catch(error => console.log(error));
}