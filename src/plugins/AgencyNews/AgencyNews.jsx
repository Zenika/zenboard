import React, { Component, PropTypes } from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
  isEmpty,
  trim,
  zipObject,
} from 'lodash'

import classes from './AgencyNews.css'

const sheetsApi = 'https://sheets.googleapis.com/v4/spreadsheets'

const defaultFetchInterval = 60
const defaultRollInterval = 15

const defaultTitle = 'Zenika'

const white = '#fff'
const zColor = '#b31835'

const isBlank = s => isEmpty(trim(s))
const defaultIfBlank = (s, sDefault) => (isBlank(s) ? sDefault : s)

export default class extends Component {

  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    sheetId: PropTypes.string.isRequired,
    fetchInterval: PropTypes.number,
    rollInterval: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      news: false,
    }
    this.data = []
    this.index = 0
  }

  componentDidMount() {
    const {
      fetchInterval = defaultFetchInterval,
    } = this.props

    this.fetch()
    this.fetchInterval = setInterval(this.fetch, fetchInterval * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
    clearInterval(this.rollInterval)
  }

  fetch = () => {
    const {
      apiKey,
      sheetId,
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
      .then(data => data.filter(news => !isBlank(news.text)))
      .then((data) => {
        this.data = data
      })
      .then(() => {
        if (!this.rollInterval) {
          const {
            rollInterval = defaultRollInterval,
          } = this.props

          this.roll()
          this.rollInterval = setInterval(this.roll, rollInterval * 1000)
        }
      })
  }

  roll = () => {
    if (this.data.length === 0) {
      this.index = -1
    } else {
      this.index = this.index + 1 >= this.data.length ? 0 : this.index + 1
    }

    const news = this.index === -1 ? false : this.data[this.index]

    this.setState(prevState => ({
      ...prevState,
      news,
    }))
  }

  render() {
    const { news } = this.state

    if (!news) {
      return <div />
    }

    const { text } = news

    let {
      title,
      titleColor,
      titleBgColor,
      color,
      backgroundColor,
    } = news

    title = defaultIfBlank(title, defaultTitle)
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
        <div key={this.index} className={classes.news}>
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
