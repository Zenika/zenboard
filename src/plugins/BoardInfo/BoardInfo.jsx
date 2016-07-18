import React, { Component } from 'react'

export default class BoardInfo extends Component {

  render() {
    return (
      <div>
        Node {process.versions.node},
        Chromium {process.versions.chrome},
        and Electron {process.versions.electron}
      </div>
    )
  }

}
