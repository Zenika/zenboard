import React, { Component } from 'react'

import logo from './images/zenika.png'

class ZenikaLogo extends Component {

  render() {
    return (
      <div>
        <img src={logo} role="presentation" style={{ width: '50%' }} />
      </div>
    )
  }

}

export default ZenikaLogo
