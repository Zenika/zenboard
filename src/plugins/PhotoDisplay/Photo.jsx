import React, { Component, PropTypes } from 'react'

class Photo extends Component {

  render() {
    const {driveImageId, apikey} = this.props
    return (<img src={`https://drive.google.com/uc?export=view&id=${driveImageId}&key=${apikey}`} width="50%" />);
  }

}

Photo.propTypes = {
  driveImageId: PropTypes.string,
  apikey: PropTypes.string
}

export default Photo
