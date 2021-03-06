import React, { Component, PropTypes } from 'react'

import classes from './Scores.css'
import Score from './Score'

const defaultPullFrequency = 10000

class Scores extends Component {

  constructor(props) {
    super(props)

    this.interval = null
    this.state = {
      scores: [],
    }
  }

  componentDidMount() {
    this.fetchScores(this.props.sourceUrl, ({ results }) => this.setState({ scores: results }))

    this.interval = setInterval(() => {
      this.fetchScores(this.props.sourceUrl, ({ results }) => this.setState({ scores: results }))
    }, this.props.pullFrequency || defaultPullFrequency)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchScores(url, callback) {
    fetch(url)
    .then(response => response.json())
    .then(callback)
  }

  render() {
    return (
      <div className={classes.scores}>
        <h2>{this.props.title || 'Leaderboard'}</h2>
        {this.state.scores.map(score => (<Score key={score.email} data={score} />))}
      </div>
    )
  }
}

Scores.propTypes = {
  title: PropTypes.string,
  sourceUrl: PropTypes.string.isRequired,
  pullFrequency: PropTypes.number,
}

export default Scores
