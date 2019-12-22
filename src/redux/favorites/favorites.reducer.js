import { ADD_FAVORITES , DELETE_FAVORITES } from '../constants/constants.js';

const INITIAL_STATE = {
	favorites:[]
}

export const favoritesReducer = (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case ADD_FAVORITES:
			return {...state,favorites:[...state.favorites,action.payload]}
		case DELETE_FAVORITES:
			return {...state,favorites:state.favorites.filter((city) =>
				city.CityName !== action.payload)}
		default:
			return state;
	}
}

export default favoritesReducer;