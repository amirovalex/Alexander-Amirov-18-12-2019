import { GET_LOCATION } from '../constants/constants.js';

const INITIAL_STATE={
	currentLocation:[]
}

const locationReducer = (state=INITIAL_STATE,action) => {
	switch(action.type) {
		case GET_LOCATION:
			return {...state,currentLocation:[action.payload]}
		default:
			return state;
	}
}

export default locationReducer;