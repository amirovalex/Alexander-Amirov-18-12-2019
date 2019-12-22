import React from 'react';
import './weathertile.styles.scss';
import { connect } from 'react-redux'

const week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const mapStateToProps = state => ({
	measureSystem:state.measureSystem
})

const WeatherTile = (props) => (
	<div className="weathertile">
		<img alt="weather" src={props.src}/>
		<div><h3>{week[new Date(props.date).getDay()]}</h3></div>
		<div><h6>{props.temperature}{props.measureSystem.celsius === true ? "°C" : "°F"}</h6></div>
	</div>
)

export default connect(mapStateToProps)(WeatherTile);