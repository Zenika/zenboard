import React, { Component, PropTypes } from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
  isEmpty,
  trim,
  zipObject,
} from 'lodash'

import classes from './AgencyNews.css'

const sheetsApi = 'https://sheets.googleapis.com/v4/spreadsheets'

const defaultRollInterval = 15

const white = '#fff'
const zColor = '#b31835'

const defaultIfBlank = (s, sDefault) => (isEmpty(trim(s)) ? sDefault : s)

export default class extends Component {

  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    sheetId: PropTypes.string.isRequired,
    rollInterval: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      data: [],
      index: 0,
    }
  }

  componentDidMount() {
    const {
      apiKey,
      sheetId,
      rollInterval = defaultRollInterval,
    } = this.props
    const dataUri = `${sheetsApi}/${sheetId}/values/A1:Z100?key=${apiKey}`

    fetch(dataUri)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(data => data || {})
      .then(data => data.values || [])
      .then(data => [data.shift() || [], data])
      .then(([props, data]) => data.map(values => zipObject(props, values)))
      .then(data => this.setState(prevState => ({
        ...prevState,
        loading: false,
        data,
      })))
      .then(() => {
        this.rollInterval = setInterval(this.roll, rollInterval * 1000)
      })
      .catch(error => this.setState(prevState => ({
        ...prevState,
        loading: false,
        error,
      }))
      )
  }

  componentWillUnmount() {
    clearInterval(this.rollInterval)
  }

  roll = () => {
    this.setState(prevState => ({
      ...prevState,
      index: prevState.index + 1 >= prevState.data.length ? 0 : prevState.index + 1,
    }))
  }

  render() {
    const { data, loading, index, error } = this.state

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>Error while loading agency news : {error}</div>
    }

    if (data.length === 0) {
      return <div />
    }

    const news = data[index]

    const {
      title,
      text,
    } = news

    let {
      titleColor,
      titleBgColor,
      color,
      backgroundColor,
    } = news

    titleColor = defaultIfBlank(titleColor, white)
    titleBgColor = defaultIfBlank(titleBgColor, zColor)
    color = defaultIfBlank(color, zColor)
    backgroundColor = defaultIfBlank(backgroundColor, white)

    return (
      <ReactCSSTransitionGroup
        transitionName={classes}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div key={index} className={classes.news}>
          <div
            className={classes.title}
            style={{ color: titleColor, backgroundColor: titleBgColor }}
          >
            <div>{title}</div>
          </div>
          <div
            className={classes.text}
            style={{ color, background: `linear-gradient(to right, ${titleBgColor}, ${backgroundColor} 2em)`, backgroundColor }}
          >
            <div>{text}</div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
