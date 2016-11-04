import React, { PropTypes, Component } from 'react'
import firebase from 'firebase'
import Legende from './Legende'
import Level from './Level'
import Glasses from './Glasses'
import styles from './Beer.css'

firebase.initializeApp({
  apiKey: "AIzaSyDNBiKuVmrwmxKYvAqV5jPLJwOQzzJKluw",
  authDomain: "devfest-beer-flow.firebaseapp.com",
  databaseURL: "https://devfest-beer-flow.firebaseio.com",
  storageBucket: "devfest-beer-flow.appspot.com",
  messagingSenderId: "35349781656"
})
const auth = firebase.auth().signInWithEmailAndPassword('zenika@zenika.com', 'zenika').catch((error) => {
  console.error(error)
})

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
      glassSizeL: props.glassSizeL || DEFAULT_OPTIONS.glassSizeL,
    }

    auth.then((user) => {
      if (user) {
        const ref = firebase.database().ref('flow')
        ref.on('child_added', this.newData)
      }
    })
  }

  newData = (data) => {
    const { liters, maxLiters, nextMaxRatio } = this.state

    const newLiters = liters + data.val()
    let newMaxLiters = maxLiters
    if (newLiters >= maxLiters) newMaxLiters *= nextMaxRatio

    this.setState({
      liters: newLiters,
      maxLiters: newMaxLiters,
    })
  }

  render() {
    const { maxLiters, liters, glassSizeL } = this.state

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
  glassSizeL: PropTypes.number,
}


export default Beer
