import React, { PropTypes } from 'react'

import classes from './ZTalks.css'

const talks = {
  Codelab: classes.zTalkTypeCodelab,
  Quickie: classes.zTalkTypeQuickie,
}

const ZTalk = ({ talk }) => {
  const classTalkType = talks[talk.type]

  return (
    <div className={classes.zTalk}>
      <div className={classes.zTalkAvatars}>
        {
          talk.speakers.map((speaker, index) =>
            <img key={index} src={speaker.img} alt="Speaker avatar" />)
        }
      </div>
      <div className={classes.zTalkContent}>
        <div className={classes.zTalkContentImportant}>
          <div className={classes.zTalkContentTitle}>{talk.title}</div>
          <div className={classes.zTalkContentSpeakers}>
            by
            {
              talk.speakers.map((speaker, i) =>
                <span key={i} className={classes.zTalkContentSpeaker}>
                {i !== 0 ? ' et ' : ''} {speaker.firstname} {speaker.lastname}
                </span>)
            }
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
        <div className={classes.zTalkTimeSeparator}></div>
        <div className={classes.zTalkTimeMinut}>{talk.date.format('mm')}</div>
      </div>
    </div>
  )
}

ZTalk.propTypes = {
  talk: PropTypes.shape({
    date: PropTypes.object,
    speakers: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      lastname: PropTypes.string,
      firstname: PropTypes.string,
    })),
    title: PropTypes.string,
    room: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.string,
  }),
}

export default ZTalk
