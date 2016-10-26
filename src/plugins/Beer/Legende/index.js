import React, { PropTypes } from 'react'
import styles from './Legende.css'

const Legende = ({ className, maxLiters, ...rest }) => {
  const levels = [maxLiters, maxLiters * 0.75, maxLiters * 0.5, maxLiters * 0.25, 0]

  return (
    <div {...rest} className={`${styles.legende} ${className}`}>
      {levels.map(l => l.toFixed(0)).map((l, i) => <div className={styles.grad}>{l} L{i === 4 || '-'}</div>)}
    </div>
  )
}

export default Legende
