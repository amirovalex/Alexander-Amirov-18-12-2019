import { SEARCH_CITY , SAVE_AUTOCOMPLETE , GET_CURRENT_CITY ,
		DAILY_FORECAST , FECTH_FAVORITES , CLEAN_FETCH } from '../constants/constants.js';

export const searchCity = name => ({
	type:SEARCH_CITY,
	payload: name
})

export const saveAutocomplete = arr => ({
	type:SAVE_AUTOCOMPLETE,
	payload: arr
})

export const saveCurrentCity = arr => ({
	type:GET_CURRENT_CITY,
	payload: arr
})

export const getDailyForecast = arr => ({
	type:DAILY_FORECAST,
	payload: arr
})

export const fetchFavorites = city => ({
	type:FECTH_FAVORITES,
	payload: city
})

export const cleanFetch = () => ({
	type:CLEAN_FETCH
})
