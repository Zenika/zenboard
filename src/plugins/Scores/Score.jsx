import React, { Component, PropTypes } from 'react'

import classes from './Scores.css'
import md5 from 'blueimp-md5'

class Score extends Component {
  render() {
    const { data } = this.props

    return (
      <div className={classes.Score}>
        <div className={classes.ScoreAvatar}>
          <img src={`http://www.gravatar.com/avatar/${md5(data.email)}`} alt="" />
        </div>
        <div className={classes.ScoreContent}>
          <span>{data.firstname}&nbsp;{data.lastname}</span>
        </div>
        <div className={classes.ScoreAmount}>
          <span>{Number.parseFloat(data.score).toFixed(3)}</span>
        </div>
      </div>
    )
  }
}

Score.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Score
