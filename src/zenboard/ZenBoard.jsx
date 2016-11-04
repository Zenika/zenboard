import React, { Component } from 'react'

import 'whatwg-fetch'

import BoardCorner from './BoardCorner/BoardCorner'
import BoardDisplay from './BoardDisplay/BoardDisplay'

import styles from './ZenBoard.css'

class ZenBoard extends Component {
  render() {
    return (
      <div className={styles.zenboard}>
        <BoardCorner position="topLeft" />
        <BoardCorner position="topRight" />
        <BoardDisplay />
        <BoardCorner position="bottomLeft" />
        <BoardCorner position="bottomRight" />
        <BoardCorner position="footer" />
      </div>
    )
  }
}

export default ZenBoard
