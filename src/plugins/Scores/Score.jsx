import React, { PropTypes } from 'react'
import md5 from 'blueimp-md5'

import classes from './Scores.css'

const Score = ({ data }) => (
  <div className={classes.score}>
    <div className={classes.scoreAvatar}>
      <img src={`http://www.gravatar.com/avatar/${md5(data.email)}`} alt="Gravatar" />
    </div>
    <div className={classes.scoreRightPart}>
      <div className={classes.scoreContent}>
        <span>{data.firstname} {data.lastname}</span>
      </div>
      <div className={classes.scoreAmount}>
        <span>{Number.parseFloat(data.score).toFixed(3)}</span>
      </div>
    </div>
  </div>
)

Score.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Score
