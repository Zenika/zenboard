import React, { Component, PropTypes } from 'react'
import Twit from 'twit'
import Tweet from 'react-tweet'

import classes from './Tweets.css'

class Tweets extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tweets: []
    }

    this.Twit = new Twit({
      consumer_key: this.props.consumer_key,
      consumer_secret: this.props.consumer_secret,
      access_token: this.props.access_token,
      access_token_secret: this.props.access_token_secret
    })

    this.handleTweet = this.handleTweet.bind(this)
  }

  handleTweet (tweet) {
    const tweets = [...this.state.tweets, tweet]
    if (tweets.length > this.props.numberOfTweetsDisplayed) {
      tweets.shift()
    }
    this.setState({ tweets })
  }

  componentWillMount() {
    this.props.tracks.forEach(track => {
       this.Twit.stream("statuses/filter", { track: track })
        .on("tweet", this.handleTweet)
    })
  }

  render() {
    return <div className={classes.Tweets}>{[...this.state.tweets]
      .reverse()
      .map((tweet, index) => (<Tweet key={index} data={tweet}/>))}</div>;
  }

}

Tweets.propTypes = {
  consumer_key: PropTypes.string,
  consumer_secret: PropTypes.string,
  access_token: PropTypes.string,
  access_token_secret: PropTypes.string,
  numberOfTweetsDisplayed: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.string)
}

export default Tweets
