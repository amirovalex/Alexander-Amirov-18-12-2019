import React from 'react';
import './navbar.styles.scss';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import toggleTheme from '../../redux/theme/theme.actions.js';

const mapStateToProps = state => ({
	theme:state.theme.themeLight
})

const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch(toggleTheme())
})

const Navbar = (props) => {
	console.log(props)
	return (
		<nav className={props.theme === true ? "navbar navbar-expand-lg navbar-light bg-light navchange" : "navbar navbar-expand-lg navbar-light bg-light navdark"}>
		  <img alt="weather" className="navbar-brand" src={props.theme === true ? require("./logo_transparent.png") : require("./logo_dark.png")} onClick={() => props.history.push('/')}/>
			  <div className={props.theme === true ? "navbar-toggler" : "navbar-toggler navbar-dark togglerDark"} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </div>
			  <div className="collapse navbar-collapse" id="navbarNav">
			    <ul className="navbar-nav">
			      <li className="nav-item">
			        <div className={props.theme === true ? "nav-link" : "nav-link text-white"} onClick={() => props.history.push('/')}>Home <span className="sr-only">(current)</span></div>
			      </li>
			      <li className="nav-item mr-3">
			        <div className={props.theme === true ? "nav-link" : "nav-link text-white"} onClick={() => props.history.push('/favorites')}>Favorites</div>
			      </li>
			      <li className="nav-item toggle">
			          Light<Switch
				        color="default"
				        onClick={() => props.toggleTheme()}
				        checked={!props.theme}
				        inputProps={{ 'aria-label': 'primary checkbox' }}
				      />Dark
			      </li>
			    </ul>
			  </div>
		</nav>
		)
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);