import icons from 'weather-icons/css/weather-icons.css'
import React, { Component, PropTypes } from 'react'

import classes from './OpenWeather.css'

const api = (cityId, apikey) => `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}&units=metric&lang=fr`

class OpenWeather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: {},
    }
  }

  componentWillMount() {
    fetch(api(this.props.cityId, this.props.apikey))
      .then(response => response.json())
      .then(json => this.setState({ response: json }))
  }

  render() {
    if (!this.state.response.weather) {
      return (<div>Meteo...</div>)
    }
    const iconName = `wiOwm${this.state.response.weather[0].id}`
    return (
      <div className={classes.openWeather}>
        <div className={classes.icon}>
          <i className={`${icons.wi} ${icons[iconName]}`} />
        </div>
        <div>
          <div className={classes.temperature}>
            {`${this.state.response.main.temp} °C`}
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
  apikey: PropTypes.string,
}

export default OpenWeather
