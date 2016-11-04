import React, { PropTypes } from 'react'
import animate from 'hoc-react-animate'
import styles from './Glasses.css'

const Glasses = ({ glasses, className, ...rest }) => {
  return (
    <div className={`${styles.glasses} ${className}`} {...rest}><span>{glasses} verres</span></div>
  )
}

Glasses.propTypes = {
  className: PropTypes.string,
  glasses: PropTypes.number.isRequired,
}

export default animate(Glasses, { watchedProps: 'glasses' })
