import React, { Component, PropTypes } from 'react'

import classes from './ZTalks.css'

class ZTalk extends Component {

  render() {

    const {talk} = this.props

    let classTalkType;
    switch (talk.type) {
      case 'Codelab':
        classTalkType = classes.zTalkTypeCodelab
        break;
      case 'Quickie':
        classTalkType = classes.zTalkTypeQuickie
        break;
      default:
        classTalkType = classes.zTalkTypeConference
    }

    return (
      <div className={classes.zTalk}>
        <div className={classes.zTalkAvatars}>
          {talk.speakers.map(speaker => <img src={speaker.img} />)}
        </div>
        <div className={classes.zTalkContent}>
          <div className={classes.zTalkContentImportant}>
            <div className={classes.zTalkContentTitle}>{talk.title}</div>
            <div className={classes.zTalkContentSpeakers}>
              by {talk.speakers.map((speaker, i) => <span className={classes.zTalkContentSpeaker}>{i !== 0 ? ' et ' : ''} {speaker.firstname} {speaker.lastname}</span>)}
            </div>
          </div>
          <div className={classes.zTalkInfos}>
            <span>Salle {talk.room}</span>
            <span className={classTalkType}>{talk.type}</span>
            <span>{talk.duration}</span>
          </div>
        </div>
        <div className={classes.zTalkTime}>
          <div className={classes.zTalkTimeHour}>{talk.date.format('HH')}</div>
          <div className={classes.zTalkTimeSeparator}>
            <div></div>
            <div></div>
          </div>
          <div className={classes.zTalkTimeMinut}>{talk.date.format('mm')}</div>
        </div>
      </div>
    )
  }
}

ZTalk.propTypes = {
  talk: PropTypes.object.isRequired,
}

export default ZTalk
