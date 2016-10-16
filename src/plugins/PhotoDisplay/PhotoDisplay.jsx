import React, { Component, PropTypes } from 'react'

import Photo from './Photo'

const API = (driveFolderId, apikey) => `https://www.googleapis.com/drive/v3/files?q='${driveFolderId}'+in+parents&key=${apikey}`;

import classes from './PhotoDisplay.css'

class PhotoDisplay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: { files: [] }
    }
  }

  componentDidMount() {
    fetch(API(this.props.driveFolderId, this.props.apikey))
      .then(response => response.json())
      .then(json => this.setState({response: json}))
  }

  render() {
    const {apikey} = this.props;
    return (
      <div className={classes.photoDisplay}>
        {this.state.response.files.map(f => <Photo key={f.id} driveImageId={f.id} apikey={apikey} />)}
      </div>
    );
  }

}

PhotoDisplay.propTypes = {
  type: PropTypes.string,
  driveFolderId: PropTypes.string,
  apikey: PropTypes.string
}

export default PhotoDisplay
