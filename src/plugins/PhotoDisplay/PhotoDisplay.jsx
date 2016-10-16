import React, { Component, PropTypes } from 'react'

class PhotoDisplay extends Component {

  render() {
    return <div>PhotoDisplay : {this.props.type}</div>
  }

}

PhotoDisplay.propTypes = {
  type: PropTypes.string,
}

export default PhotoDisplay
