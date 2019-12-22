import { TOGGLE_SYSTEM } from '../constants/constants.js';

const INITIAL_STATE = {
	celsius:true,
	fahrenheit:false
}

const measureSystemReducer = (state=INITIAL_STATE,action) => {
	switch(action.type) {
		case TOGGLE_SYSTEM:
			return {...state,celsius:!state.celsius,
							 fahrenheit:!state.fahrenheit}
		default:
			return state;
	}
}

export default measureSystemReducer;