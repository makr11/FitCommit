import { isEmpty } from './functions';

export function emptyFields(input){
	let hasEmptyFields = false;
	let objEmptyFields = {}

	for(let key in input){
		if(input[key] === ""){
			hasEmptyFields = true;
			objEmptyFields[key] = true;
		}else if(typeof input[key] === 'object'){
			if(isEmpty(input[key])){
				hasEmptyFields = true;
				objEmptyFields[key] = true;
			}
		}
	}
	return {hasEmptyFields, objEmptyFields}
};

export function handleDiscount(input){
	try {
		if(typeof input === "string"){
			input = parseInt(input, 10); 
		}
		input = (isNaN(input))?0:input
		if(input < 100){
			return input;
		}else{
			return Math.floor(input / 10)
		}		
	}
	catch(err){
		return input.slice(0, -1);
	}
}