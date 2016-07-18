import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import plugins from 'plugins'

import classes from './BoardDisplay.css'

class BoardDisplay extends Component {

  componentDidMount() {
    this._changeInterval = setInterval(this.props.nextDisplay, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this._changeInterval);
  }

  render() {
    const display = this.props.display;
    if (!display || !display.plugin) {
      return (<div className={classes.container}><h1>No display</h1></div>);
    }

    const plugin = plugins.find(p => p.name === display.plugin);
    if (!plugin) {
      return (<div className={classes.container}><h1>Plugin '{display.plugin}' not found</h1></div>);
    }

    return (
      <ReactCSSTransitionGroup
          className={classes.container}
          transitionName={classes}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <plugin.component key={display.plugin} position='center' {...display.props} />
      </ReactCSSTransitionGroup>
    )
  }
}

BoardDisplay.propTypes = {
  interval: PropTypes.number,
  display: PropTypes.object,
  nextDisplay: PropTypes.func
}

export default BoardDisplay;
