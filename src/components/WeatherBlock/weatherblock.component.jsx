import React from 'react';
import WeatherTile from '../WeatherTile/weathertile.component.jsx';
import { connect } from 'react-redux';
import './weatherblock.styles.scss';
import { addFavorites , deleteFavorites } from '../../redux/favorites/favorites.actions.js';
import { getDailyForecast } from '../../redux/search/search.actions.js';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const StyledButton = withStyles({
  root: {
    background: 'rgba(50, 120, 193,1)',
    border: 0,
    color: 'white',
    height: 'auto',
    width: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
    fontSize: '1rem',
    ['@media (min-width:800px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.9rem'
    },
    boxShadow: '0 2px 3px 0 rgba(60,109,180,0.5)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const mapStateToProps = state => ({
	currentCity: state.search.currentCity,
	dailyForecast: state.search.dailyForecast,
	favorites: state.favorites.favorites,
	measureSystem: state.measureSystem,
	theme:state.theme.themeLight
})

const mapDispatchToProps = dispatch => ({
	addFavorites: city => dispatch(addFavorites(city)),
	deleteFavorites: city => dispatch(deleteFavorites(city)),
	getDailyForecast: arr => dispatch(getDailyForecast(arr))
})

const WeatherBlock = (props) => {

	const getWeatherImage = () => ((props.currentCity.Weather === undefined)
						 ?
							(require("../../icons/sun.png"))
							 :	(props.currentCity.Weather.HasPrecipitation === true &&
								props.currentCity.Weather.PrecipitationType === "Rain"
								?
									require("../../icons/cloud-rain.png")
									:
										(props.currentCity.Weather.IsDayTime === false &&
										 props.currentCity.Weather.HasPrecipitation === false
											 ?
											 	require("../../icons/moon.png")
											 	:
											 	((props.currentCity.Weather.IsDayTime === true &&
						 						props.currentCity.Weather.HasPrecipitation === false)
											 		?
											 		require("../../icons/sun.png")
											 		:
											 		(props.currentCity.Weather.IsDayTime === false &&
											 			props.currentCityWeatherHasPrecipitation === true )
											 		?
											 		require("../../icons/cloud-rain.png")
											 		:
											 		require("../../icons/sun.png")))
											 )
							 )

	const getDailyForecastImage = (day) => ((day.Day.HasPrecipitation === false &&
						 day.Day.IconPhrase === "Sunny") ||
						 (day.Day.IconPhrase === "Mostly sunny")
						  ?
						 (require('../../icons/sun.png'))
						 :
						 ((day.Day.IconPhrase === "Cloudy" &&
						  day.Day.HasPrecipitation === false) ||
						  (day.Day.IconPhrase === "Mostly cloudy"))
						  	?
						  	(require('../../icons/cloud.png'))
						  	:
						  	(((day.Day.IconPhrase === "Showers" ||
						  	day.Day.IconPhrase === "Rain") ||
						  	(day.Day.IconPhrase === "Cloudy" &&
						  	day.Day.HasPrecipitation === true)
						  		?
						  		(require('../../icons/cloud-rain.png'))
						  		:
						  		(day.Day.IconPhrase === "Dreary" &&
						  		 day.Day.HasPrecipitation === false
						  		 	?
						  		 	(require('../../icons/cloud-more.png'))
						  		 	:
						  		 		(day.Day.IconPhrase === "Partly sunny" ||
						  		 		 day.Day.IconPhrase === "Intermittent clouds"
						  		 			?
						  		 			require('../../icons/cloud-sun.png')
						  		 			:
						  		 			 	(require('../../icons/sun.png')))))))
	
	return(
	<div className={props.theme === false ? "weatherblock weatherblock-dark" : "weatherblock"}>
		<div className="weathernav p-2">
			<div className="current">
				<img alt="weather" src={getWeatherImage()}/>
				<div className="cityName">{(props.currentCity === null) ? null : props.currentCity.CityName}</div>
				{props.measureSystem.celsius === true ?
					<div className="temperature">{(props.currentCity === null || props.currentCity.Weather === undefined) ? null : `${props.currentCity.Weather.Temperature.Metric.Value}°${props.currentCity.Weather.Temperature.Metric.Unit}`}</div>
					:
					<div className="temperature">{(props.currentCity === null || props.currentCity.Weather === undefined) ? null : `${props.currentCity.Weather.Temperature.Imperial.Value}°${props.currentCity.Weather.Temperature.Imperial.Unit}`}</div>
				}
			</div>
			<div className="buttonDiv">
				{props.currentCity === null ?
				<StyledButton disabled className="addbutton" variant="contained">
				  Add to Favorites
				</StyledButton>
				:
				<StyledButton className={props.theme === false ? "addbutton-dark" : "addbutton"} 
				onClick={() => {props.favorites.filter(city =>
				city.CityName === props.currentCity.CityName).length > 0 
				? props.deleteFavorites(props.currentCity.CityName) 
				: props.addFavorites(props.currentCity)}} 
				variant="contained">	
				{props.favorites.filter(city =>
				city.CityName === props.currentCity.CityName).length > 0 ? 'Delete Favorite'
					:
					'Add Favorite'}
				</StyledButton>
				}
			</div>
		</div>
		<div className="p-2 daily-forecast">
			{props.dailyForecast.length === 0 
			?
			<h5>Search for your city</h5>
			: (props.dailyForecast[0].DailyForecasts.map((day2,i) => {
				var newDate = new Date(day2.Date);
				var convertedDate = ((newDate.getMonth() > 8) ? (newDate.getMonth() + 1) : ('0' + (newDate.getMonth() + 1))) + '/' + ((newDate.getDate() > 9) ? newDate.getDate() : ('0' + newDate.getDate())) + '/' + newDate.getFullYear();
				return(
					<WeatherTile
					src={getDailyForecastImage(day2)}
					key={i}
					date={convertedDate}
					temperature={day2.Temperature.Maximum.Value}
					/>
				)}
			))	
			}
		</div>
	</div>
	)
}

export default connect(mapStateToProps,mapDispatchToProps)(WeatherBlock);