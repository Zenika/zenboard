import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'
import ZTalk from './ZTalk'

import classes from './ZTalks.css'

const api = (spreadsheetId, apikey) => `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:F30?key=${apikey}`

moment.locale('fr')

class ZTalks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      talks: [],
    }
  }

  componentDidMount() {
    fetch(api(this.props.spreadsheetId, this.props.apikey))
     .then(response => response.json())
     .then(json => this.formatTalks(json.values))
  }

  formatTalks(data) {
    const headers = data[0]
    const dateIndex = headers.indexOf('date')
    const speakersIndex = headers.indexOf('speakers')
    const titleIndex = headers.indexOf('title')
    const roomIndex = headers.indexOf('room')
    const typeIndex = headers.indexOf('type')
    const durationIndex = headers.indexOf('duration')

    const talks = _(data).slice(1)
      .map(t => {
        return {
          date: moment(t[dateIndex]),
          speakers: JSON.parse(t[speakersIndex]),
          title: t[titleIndex],
          room: t[roomIndex],
          type: t[typeIndex],
          duration: t[durationIndex],
        }
      })
      .sortBy('date')
      .groupBy(t => t.date.format('dddd Do MMMM'))
      .value()

    this.setState({
      talks,
    })
  }

  render() {
    const { title } = this.props
    return (
      <div className={classes.zTalks}>
        <h2>{title}</h2>
        <div className={classes.zTalksContainer}>
          {Object.keys(this.state.talks).map(key =>
            <div key={key} className={classes.zTalksColumn}>
              <h3>{key}</h3>
              {this.state.talks[key].map((talk, index) => <ZTalk key={index} talk={talk} />)}
            </div>
          )}
        </div>
      </div>
    )
  }

}

ZTalks.propTypes = {
  spreadsheetId: PropTypes.string,
  apikey: PropTypes.string,
  title: PropTypes.string,
}

export default ZTalks
