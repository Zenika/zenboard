import React, { PropTypes } from 'react'

import classes from './PhotoGallery.css'

function computeClassname() {
  const rndIdx = Math.floor((Math.random() * 3) + 1)
  return classes[`pic-${rndIdx}`]
}

const PhotoGallery = ({ photos }) => (
  <div className={classes.photoGallery}>
    {photos.map((photo, index) =>
      <div key={index} className={computeClassname()}>
        <img src={photo} role="presentation" />
      </div>
    )}
  </div>
)

PhotoGallery.propTypes = {
  photos: PropTypes.array,
}

export default PhotoGallery
