import React , { Component } from 'react';
import { Route } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { toggleTheme , setTheme } from './redux/theme/theme.actions.js';
import { getLocation } from './redux/location/location.actions.js';
import { saveCurrentCity , getDailyForecast } from './redux/search/search.actions.js';
import Navbar from './components/Navbar/navbar.component.jsx';
import SearchBox from './components/SearchBox/searchbox.component.jsx';
import WeatherBlock from './components/WeatherBlock/weatherblock.component.jsx';
import Favorites from './pages/Favorites/favorites.component.jsx';
import './App.css';
import apiKey from './api_key.js';
import BackgroundDark from './background.jpg';
import BackgroundLight from './background3.jpg'
import { ToastProvider } from 'react-toast-notifications';
import handleErrors from './handleErrors.js';

  const mapStateToProps = state => ({
  location: state.location.getLocation,
  theme: state.theme.themeLight,
  currentCity: state.search.currentCity
})

const mapDispatchToProps = dispatch => ({
  getLocation: coords => dispatch(getLocation(coords)),
  saveCurrentCity: arr => dispatch(saveCurrentCity(arr)),
  getDailyForecast: arr => dispatch(getDailyForecast(arr)),
  toggleTheme: () => dispatch(toggleTheme()),
  setTheme: bool => dispatch(setTheme(bool))
})

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

class App extends Component {
  componentDidMount(){
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {this.props.saveCurrentCity({Weather:data[0]
                                ,CityName:"Tel Aviv"
                                ,CityKey:"215854"})
          return (this.props.currentCity.Weather.IsDayTime === false ? this.props.setTheme(false) 
            :
            null)
          })
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.props.currentCity.CityKey}?apikey=${apiKey}&metric=true`)
        .then(handleErrors)
        .then(res => res.json())
        .then(data2 => this.props.getDailyForecast(data2))
        .catch(error => console.log(error))

    navigator.geolocation.getCurrentPosition((pos) => {const crd = pos.coords;
      this.props.getLocation(crd);
      fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${crd.latitude}%2C%20${crd.longitude}`)
      .then(respone => respone.json())
      .then(data => {fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=${apiKey}`)
            .then(response2 => response2.json().then(arr => {this.props.saveCurrentCity({Weather:arr[0],CityName:data.LocalizedName,CityKey:data.Key});
                  if (this.props.currentCity.Weather.IsDayTime === false) {this.props.setTheme(false)}}));
            fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=${apiKey}&metric=true`)
            .then(response3 => response3.json().then(data2 => this.props.getDailyForecast(data2)))})
    } , error, options);
  }

  render(props){
    let sectionStyle = {
    height:'100%',
    width:'100%',
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: this.props.theme === true ? `url(${BackgroundLight})` : `url(${BackgroundDark})`
  };
    return (
      <ToastProvider>
          <div style={{height:"100%"}}>
            <Route path="/" component={Navbar} />
            <div style={sectionStyle} 
              className="background">
              <Route exact path="/" component={SearchBox} />
                <Route exact path="/" component={WeatherBlock} />
              <Route path="/favorites" component={Favorites} />
            </div>
          </div>
      </ToastProvider>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
