import React, { Component, PropTypes } from 'react'
import plugins from 'plugins'

import classes from './BoardCorner.css'

class BoardCorner extends Component {

  render() {
    const {position, display} = this.props;

    if (!display || !display.plugin) {
      return (<div className={classes[position]}></div>);
    }

    const plugin = plugins.find(p => p.name === display.plugin);
    if (!plugin) {
      return (<div className={classes[position]}>Plugin '{display.plugin}' not found</div>);
    }

    return (
      <div className={classes[position]}>
        <plugin.component key={display.plugin} position={position} {...display.props} />
      </div>
    )
  }
}

BoardCorner.propTypes = {
  position: PropTypes.string,
  display: PropTypes.object
}

export default BoardCorner;
