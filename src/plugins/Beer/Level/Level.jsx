import React, { PropTypes } from 'react'
import styles from './Level.css'

const Level = ({ percent, className, ...rest }) => {
  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      <div style={{ height: percent }} className={styles.level} />
      <div style={{ height: percent }} className={styles.bubble} />
    </div>
  )
}

Level.propTypes = {
  percent: PropTypes.number.isRequired,
  className: PropTypes.string,
}

export default Level
