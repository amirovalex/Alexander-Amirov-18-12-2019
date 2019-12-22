import { GET_LOCATION } from '../constants/constants.js';

export const getLocation = coords => ({
	type:GET_LOCATION,
	payload:coords
})