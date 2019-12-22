import { TOGGLE_THEME , SET_THEME } from '../constants/constants.js';

export const toggleTheme = () => ({
	type:TOGGLE_THEME
})

export const setTheme = bool => ({
	type:SET_THEME,
	payload:bool
})

export default toggleTheme;