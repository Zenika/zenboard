import React, { PropTypes, Component } from 'react'
import Legende from './Legende'
import Level from './Level'
import Glasses from './Glasses'
import styles from './Beer.css'

const DEFAULT_OPTIONS = {
  maxLiters: 100,
  nextMaxRatio: 1.3,
  glassSizeL: 0.25,
  liters: 0,
}

class Beer extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      maxLiters: props.maxLiters || DEFAULT_OPTIONS.maxLiters,
      liters: props.liters || DEFAULT_OPTIONS.liters,
      nextMaxRatio: props.nextMaxRatio || DEFAULT_OPTIONS.nextMaxRatio,
      glassSizeL: props.glassSizeL || DEFAULT_OPTIONS.glassSizeL,
    }
  }

  render() {
    const { maxLiters, nextMaxRatio, liters, glassSizeL } = this.state

    // FIXME: debug purpose
    setTimeout(() => {
      const newLiters = liters + 10
      let newMaxLiters = maxLiters
      if (newLiters >= maxLiters) newMaxLiters *= nextMaxRatio

      this.setState({
        liters: newLiters,
        maxLiters: newMaxLiters,
      })
    }, 600)

    return (
      <div className={styles.plugin}>
        <Legende className={styles.legende} maxLiters={maxLiters} />
        <Level className={styles.level} percent={`${(liters * 100) / maxLiters}%`} />
        <Glasses glasses={(liters / glassSizeL).toFixed(0)} />
      </div>
    )
  }
}

Beer.propTypes = {
  maxLiters: PropTypes.number,
  nextMaxRatio: PropTypes.number,
  liters: PropTypes.number,
}


export default Beer
