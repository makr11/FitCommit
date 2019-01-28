import {
	GET_SERVICES_SUCCESS,
	GET_SERVICES_FAILED,
} from '../../constants/reduxConstants';

const initialStateServices = {
	services: [],
	service: {},
	category: {},
	option: {},
	error: ''
};

export const servicesReducer = (state=initialStateServices, action={}) => {
	switch(action.type) {
		case GET_SERVICES_SUCCESS:
			let service = {};
			let category = {};
			let option = {};
			action.payload.forEach(serviceData => {
				service[serviceData.id] = serviceData;
				serviceData.categories.forEach(categoryData => {
					category[categoryData.id] = categoryData;
					categoryData.options.forEach(optionData => {
						option[optionData.id] = optionData;
					})
				})
		})
			return Object.assign({}, state, { services: action.payload, service: service, category: category, option: option });
		case GET_SERVICES_FAILED:
			return Object.assign({}, state, { error: action.payload});
		default:
			return state;
	}
};