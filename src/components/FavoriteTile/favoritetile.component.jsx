import React from 'react';
import './favoritetile.styles.scss';
import Button from '@material-ui/core/Button';
import { deleteFavorites } from '../../redux/favorites/favorites.actions.js';
import { saveCurrentCity , getDailyForecast , deleteFetchFavorite } from '../../redux/search/search.actions.js';
import { connect } from 'react-redux';
import apiKey from '../../api_key.js';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../../handleErrors.js';


const mapStateToProps = state => ({
	measureSystem:state.measureSystem,
	theme:state.theme.ThemeLight
})

const mapDispatchToProps = dispatch => ({
	deleteFavorites: city => dispatch(deleteFavorites(city)),
	saveCurrentCity: city => dispatch(saveCurrentCity(city)),
	getDailyForecast: arr => dispatch(getDailyForecast(arr)),
	deleteFetchFavorite: city => dispatch(deleteFetchFavorite(city))
})

const FavoriteTile = (props) => {
  const fetchFavoriteCity = () => {props.saveCurrentCity(props.city);
					props.measureSystem.celsius === true 
					?
					fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.CityKey}?apikey=${apiKey}&metric=true`)
					.then(handleErrors)
            		.then(response => response.json())
            		.then(data => props.getDailyForecast(data))
            		.catch(error => error ? addToast(error.message, { appearance: 'error' })
            			: addToast('Saved Successfully', { appearance: 'success' }))
            		:
            		fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.CityKey}?apikey=${apiKey}`)
            		.then(handleErrors)
            		.then(response => response.json())
            		.then(data => props.getDailyForecast(data))
            		.catch(error => error ? addToast(error.message, { appearance: 'error' })
            			: addToast('Saved Successfully', { appearance: 'success' }))
            		props.history.push('/')}

  const { addToast } = useToasts()

	return(
	<div onClick={() => fetchFavoriteCity()} className={props.theme === true ? "tile m-2" : "tiledark m-2"}>
		<div className="fav-id">{props.id}</div>
		<div className="cityName">{props.cityName}</div>
		<div>{props.temperature}{props.measureSystem.celsius === true ? "°C" : "°F"}</div>
		<div>{props.weatherText}</div>
		<Button onClick={(event) => {event.stopPropagation();props.deleteFavorites(props.cityName);props.deleteFetchFavorite(props.cityName)}} className="delete-butt m-3" variant="contained" color="secondary">
		  Delete
		</Button>
	</div>
)}

export default connect(mapStateToProps,mapDispatchToProps)(FavoriteTile);