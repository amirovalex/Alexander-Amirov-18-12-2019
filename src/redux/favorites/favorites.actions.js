import { ADD_FAVORITES , DELETE_FAVORITES } from '../constants/constants.js';

export const addFavorites = city => ({
	type:ADD_FAVORITES,
	payload: city
})

export const deleteFavorites = city => ({
	type:DELETE_FAVORITES,
	payload:city
})