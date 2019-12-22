import React , { useEffect } from 'react';
import FavoriteTile from '../../components/FavoriteTile/favoritetile.component.jsx';
import Scroll from '../../components/Scroll/scroll.component.jsx';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import apiKey from '../../api_key.js'; 
import './favorites.styles.scss';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../../handleErrors.js';
import { fetchFavorites , cleanFetch } from '../../redux/search/search.actions.js';

const mapStateToProps = state => ({
	favorites:state.favorites.favorites,
	measureSystem: state.measureSystem,
	favoritesData: state.search.favoritesData
})

const mapDispatchToProps = dispatch => ({
	fetchFavorites: city => dispatch(fetchFavorites(city)),
	cleanFetch: () => dispatch(cleanFetch())
})

export const Favorites = (props) => {
  const { addToast } = useToasts();

  useEffect(() => {props.favorites.map((city,i) => {
		fetch(`https://dataservice.accuweather.com/currentconditions/v1/${city.CityKey}?apikey=${apiKey}`)
		.then(handleErrors)
		.then(response => response.json())
		.then(res => props.fetchFavorites({Weather:res[0],CityName:city.CityName,CityKey:city.CityKey}))
		.catch(error => addToast(error.message, { appearance: 'error' }))
		return null
		});
		return () => {
			props.cleanFetch()
		}},[]);
  	const measureSystem = props.measureSystem
	return(
			<Scroll>
					<div className="fav-grid">
						{props.favorites === [] 
							? <h2>No favorites</h2> 
							: props.favoritesData.map((city,i) => {
								return (
									<Route exact key={i} path='/favorites'
							          render={(props) => <FavoriteTile 
							          		{...props}
							          		city={city}
											key={i}
											CityKey={city.CityKey}
											id={i+1}
											cityName={city.CityName}
											temperature={measureSystem.celsius === true 
												? 
												city.Weather.Temperature.Metric.Value
												:
												city.Weather.Temperature.Imperial.Value}
											weatherText={city.Weather.WeatherText}/>
								        }/>
									)
							})
						}
					</div>
			</Scroll>
		)
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);