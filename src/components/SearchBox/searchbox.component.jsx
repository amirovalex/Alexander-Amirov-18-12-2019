import React from 'react';
import { connect } from 'react-redux';
import { searchCity , saveAutocomplete , saveCurrentCity , getDailyForecast } from '../../redux/search/search.actions.js';
import { toggleSystem } from '../../redux/measureSystem/measureSystem.actions.js';
import './searchbox.styles.scss';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import apiKey from '../../api_key.js';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../../handleErrors.js';




// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'rgba(50, 120, 193,1)',
    borderRadius: 1,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    fontSize: '1.3rem',
    boxShadow: '0 2px 3px 0 rgba(60,109,180,0.5)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const mapStateToProps = state => ({
	search: state.search.currentSearch,
	autocomplete: state.search.autocomplete,
  measureSystem: state.measureSystem,
  currentCity: state.search.currentCity,
  theme: state.theme.themeLight
})

const mapDispatchToProps = dispatch => ({
  searchCity: name => dispatch(searchCity(name)),
  saveAutocomplete: arr => dispatch(saveAutocomplete(arr)),
  saveCurrentCity: arr => dispatch(saveCurrentCity(arr)),
  getDailyForecast: arr => dispatch(getDailyForecast(arr)),
  toggleSystem: () => dispatch(toggleSystem())
})



const SearchBox = (props) => {

  const { addToast } = useToasts();

  const fetchOnSearch = () => {if(props.search !== "" ){fetch(`https://dataservice.accuweather.com/currentconditions/v1/${props.autocomplete[0].Key}?apikey=${apiKey}`)
            .then(handleErrors)
            .then(response => response.json().then(arr => props.saveCurrentCity({Weather:arr[0],CityName:props.autocomplete[0].LocalizedName,CityKey:props.autocomplete[0].Key})))
            .catch(error => error ? addToast(error.message, { appearance: 'error' })
                : addToast('Saved Successfully', { appearance: 'success' }));
            fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.autocomplete[0].Key}?apikey=${apiKey}${props.measureSystem.celsius === true ? "&metric=true" : ""}`)
            .then(handleErrors)
            .then(response => response.json()
            .then(data => props.getDailyForecast(data))
            .catch(error => error ? addToast(error.message, { appearance: 'error' })
                : addToast('Saved Successfully', { appearance: 'success' }))
            )} else {return null}}

  const fetchTemperature = () => {props.toggleSystem();
                        fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.currentCity.CityKey}?apikey=${apiKey}${props.measureSystem.celsius !== true ? "&metric=true" : ""}`)
                        .then(handleErrors)
                        .then(response => response.json()
                        .then(data => props.getDailyForecast(data)))
                        .catch(error => error ? addToast(error.message, { appearance: 'error' })
            : addToast('API call successfull', { appearance: 'success' }))
                      }
 
	return(
		<div className="searchbox">
    °C<Switch
        onClick={() => fetchTemperature()}
        color="default"
        checked={props.measureSystem.fahrenheit}
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />°F
		<Autocomplete
		className="searchfield"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={(event,value) => { props.searchCity(value);
            					if(value.length > 0 && !value.startsWith(" ")) {fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`)
                .then(handleErrors)
								.then(response => response.json()).then(arr => props.saveAutocomplete(arr))
                .catch(error => error ? addToast(error.message, { appearance: 'error' })
            : addToast('Saved Successfully', { appearance: 'success' }))
              }}}
        options={props.autocomplete === "" ? [] : props.autocomplete.map(city => city.LocalizedName)}
        renderInput={params => (
          <TextField
            {...params}
            type="text" placeholder="Enter your city name"
            label="Search input"
            margin="none"
            variant="filled"
            className={ props.theme === true ? "textfield classes light" : "textfield classes"}
            size="small"
            color="primary"
            fullWidth
            onChange={event => { props.searchCity(event.target.value);
            					if(event.target.value.length > 0 && !event.target.value.startsWith(" ")) {fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${event.target.value}`)
                .then(handleErrors)
								.then(response => response.json())
                .then(arr => props.saveAutocomplete(arr))
                .catch(error => error ? addToast(error.message, { appearance: 'error' })
            : addToast('Saved Successfully', { appearance: 'success' }))
              }}}
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
          )}
        />
        
        <StyledButton 
            onClick={() => fetchOnSearch()} color="primary" className={props.theme === true ? "searchbutt-light" : "searchbutt-dark"} variant="contained">
        Search
      	</StyledButton>
		</div>
		)
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBox);