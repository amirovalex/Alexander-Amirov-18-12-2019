import { TOGGLE_THEME , SET_THEME} from '../constants/constants.js';

const INITIAL_STATE = {
	themeLight:true
}

const themeReducer = (state=INITIAL_STATE,action) => {
	switch(action.type){
		case TOGGLE_THEME:
			return {...state,themeLight:!state.themeLight}
		case SET_THEME:
			return {...state,themeLight:action.payload}
		default:
			return state
	}
}

export default themeReducer;