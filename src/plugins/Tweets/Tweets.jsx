import React, { Component, PropTypes } from 'react'
import Twit from 'twit'
import Tweet from 'react-tweet'

import classes from './Tweets.css'

class Tweets extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tweets: [],
    }

    this.Twit = new Twit({
      consumer_key: this.props.consumer_key,
      consumer_secret: this.props.consumer_secret,
      access_token: this.props.access_token,
      access_token_secret: this.props.access_token_secret,
    })

    this.handleTweet = this.handleTweet.bind(this)
  }

  componentWillMount() {
    this.Twit.stream('statuses/filter', { track: this.props.track })
      .on('tweet', this.handleTweet)
  }

  handleTweet(tweet) {
    const tweets = [...this.state.tweets, tweet]
    if (tweets.length > (this.props.numberOfTweetsDisplayed || 10)) {
      tweets.shift()
    }
    this.setState({ tweets })
  }

  render() {
    return (
      <div className={classes.Tweets}>
        {
          [...this.state.tweets]
          .reverse()
          .map(tweet => (<Tweet key={tweet.id} data={tweet} />))
        }
      </div>
    )
  }

}

Tweets.propTypes = {
  consumer_key: PropTypes.string.isRequired,
  consumer_secret: PropTypes.string.isRequired,
  access_token: PropTypes.string.isRequired,
  access_token_secret: PropTypes.string.isRequired,
  numberOfTweetsDisplayed: PropTypes.number,
  track: PropTypes.string.isRequired,
}

export default Tweets
