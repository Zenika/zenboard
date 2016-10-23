import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'
import ZTalk from './ZTalk'

import classes from './ZTalks.css'

const API = (spreadsheetId, apikey) => `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:F30?key=${apikey}`;

class ZTalks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      talks: []
    }
    this.formatTalks.bind(this);
    moment.locale('fr')
  }

  componentDidMount() {
    fetch(API(this.props.spreadsheetId, this.props.apikey))
     .then(response => response.json())
     .then(json => this.formatTalks(json.values))
  }

  formatTalks(data) {
    const headers = data[0];
    const dateIndex = headers.indexOf('date');
    const speakersIndex = headers.indexOf('speakers');
    const titleIndex = headers.indexOf('title');
    const roomIndex = headers.indexOf('room');
    const typeIndex = headers.indexOf('type');
    const durationIndex = headers.indexOf('duration');

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
      .value();

    this.setState({
      talks: talks
    })
  }

  render() {
    const {title} = this.props
    return (
      <div className={classes.zTalks}>
        <h2>{title}</h2>
        <div className={classes.zTalksContainer}>
          {Object.keys(this.state.talks).map(key =>
            <div className={classes.zTalksColumn}>
              <h3>{key}</h3>
              {this.state.talks[key].map(talk => <ZTalk talk={talk} />)}
            </div>
          )}
        </div>
      </div>
    )
  }

}

ZTalks.defaultProps = {
  spreadsheetId: '1UbVLzABevAOricgl3VxPG_9dUr0Fvoeth5NRBJbDQGE',
  apikey: 'AIzaSyDg0HPlcKUDAcNIvQKnArRLqFPeGXvPhi8',
  title: 'DevFest Nantes 2016 - Nos talks'
}

ZTalks.propTypes = {
  spreadsheetId: PropTypes.string,
  apikey: PropTypes.string,
  title: PropTypes.string
}

export default ZTalks
