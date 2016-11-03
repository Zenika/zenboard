import React, { Component, PropTypes } from 'react'

import classes from './Scores.css'
import Score from './Score.jsx'

class Scores extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scores: [],
    }
  }

  componentDidMount() {
    fetch(this.props.sourceUrl)
    .then(response => response.json())
    .then(({ results }) => {
      this.setState({ scores: results })
    })
  }

  render() {
    return (
      <div className={classes.Scores}>
        {this.state.scores.map(score => (<Score key={score.email} data={score} />))}
      </div>
    )
  }
}

Scores.propTypes = {
  sourceUrl: PropTypes.string.isRequired,
}

export default Scores
