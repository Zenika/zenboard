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

    this.T = new Twit({
      consumer_key:         "YHB8AQNKvPPPHX82qQOpTbGk2",
      consumer_secret:      "zzn3BrlT9yX0TD5N2FPPoqDCkbUGTIoLsBNlwNCsOr6VeyaTGT",
      access_token:         "3060034006-9LmpxpFRjrBdQRJr54CMiAi7WXKLO1L7q6BaW0Q",
      access_token_secret:  "rVggvU5SnvTr1OVGyygU9vQRSzrQolurkFqPyRCYiVeTR",
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    })

    this.handleTweet = this.handleTweet.bind(this)
  }

  handleTweet (tweet) {
    const tweets = this.state.tweets.concat([tweet])
    if (tweets.length > 10) {
      tweets.shift()
    }
    this.setState({ tweets: tweets })
  }

  componentDidMount() {
    const streams = this.props.tracks.map(track => {
      return this.T.stream("statuses/filter", { track: track })
    })

    streams.forEach(stream => {
      stream.on("tweet", this.handleTweet)
    })
  }

  render() {
    return <div className={classes.Tweets}>{this.state.tweets
      .concat([])
      .reverse()
      .map((tweet, index) => (<Tweet key={index} className="TOTO" data={tweet}/>))}</div>;
  }

}

export default Tweets
