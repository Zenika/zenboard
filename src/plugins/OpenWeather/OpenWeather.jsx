import React, { Component, PropTypes } from 'react'

const API = (cityId, apikey) => `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}&units=metric&lang=fr`;

import icons from 'weather-icons/css/weather-icons.css'
import classes from './OpenWeather.css'

class OpenWeather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: {}
    }
  }

  componentWillMount() {
    fetch(API(this.props.cityId, this.props.apikey))
      .then(response => response.json())
      .then(json => this.setState({response: json}))
  }

  render() {
    if (!this.state.response.weather) {
      return (<div>Meteo...</div>)
    }
    return (
      <div className={classes.openWeather}>
        <div className={classes.icon}>
          <i className={icons.wi+' ' + icons['wiOwm' + this.state.response.weather[0].id]}></i>
        </div>
        <div>
          <div className={classes.temperature}>
            {this.state.response.main.temp + ' °C'}
          </div>
          <div className={classes.city}>
            {this.state.response.name}
          </div>
        </div>
      </div>
    )
  }

}

OpenWeather.propTypes = {
  cityId: PropTypes.string,
  apikey: PropTypes.string
}

export default OpenWeather
