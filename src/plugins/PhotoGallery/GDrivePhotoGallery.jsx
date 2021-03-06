import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import PhotoGallery from './PhotoGallery'

const api = (driveFolderId, apikey) => `https://www.googleapis.com/drive/v3/files?q='${driveFolderId}'+in+parents&key=${apikey}`
const img = (id, apikey) => `https://drive.google.com/uc?export=view&id=${id}&key=${apikey}`

class GDrivePhotoGallery extends Component {

  constructor(props) {
    super(props)
    this.state = { photos: [] }
  }

  componentDidMount() {
    const { driveFolderId, apikey } = this.props
    fetch(api(driveFolderId, apikey))
      .then(response => response.json())
      .then((json) => {
        this.setState({ photos: json.files.map((f) => {
          return { id: f.id, src: img(f.id, apikey) }
        }) })
      })
  }

  selectRandomPhotos(nbPhotos) {
    return _(this.state.photos)
      .shuffle()
      .take(nbPhotos)
      .value()
  }

  render() {
    const photos = this.selectRandomPhotos(this.props.nbPhotos)
    return <PhotoGallery photos={photos} />
  }

}

GDrivePhotoGallery.defaultProps = {
  nbPhotos: 4,
}


GDrivePhotoGallery.propTypes = {
  driveFolderId: PropTypes.string,
  nbPhotos: PropTypes.number,
  apikey: PropTypes.string,
}

export default GDrivePhotoGallery
