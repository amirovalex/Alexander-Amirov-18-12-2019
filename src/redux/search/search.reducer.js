import { SEARCH_CITY , SAVE_AUTOCOMPLETE , GET_CURRENT_CITY,
		DAILY_FORECAST , FECTH_FAVORITES , CLEAN_FETCH ,
		DELETE_FETCH_FAVORITE } from '../constants/constants.js';


const INITIAL_STATE = {
	currentSearch:"",
	autocomplete:"",
	currentCity:{
		CityName:"Tel Aviv",
		CityKey:"215854"
	},
	dailyForecast:[],
	favoritesData:[]
}
 
const searchReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_CITY:
			return {...state,currentSearch:action.payload}
		case SAVE_AUTOCOMPLETE:
			return {...state,autocomplete:action.payload}
		case GET_CURRENT_CITY:
			return {...state,currentCity:action.payload}
		case DAILY_FORECAST:
			return {...state,dailyForecast:[action.payload]}
		case FECTH_FAVORITES:
			return {...state,favoritesData:[...state.favoritesData,action.payload]}
		case CLEAN_FETCH:
			return {...state,favoritesData:[]}
		case DELETE_FETCH_FAVORITE:
			return {...state,favoritesData:state.favoritesData.filter((city) =>
				city.CityName !== action.payload)}
		default:
			return state;
	}
}

export default searchReducer;