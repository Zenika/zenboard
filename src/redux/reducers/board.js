import { NEXT_DISPLAY } from '../actions'
import CONFIG from '../../config'

export const initState = {
  interval: CONFIG.interval,
  displayIndex: 0,
  display: CONFIG.displays.content[0],
  topLeft: CONFIG.displays.topLeft,
  topRight: CONFIG.displays.topRight,
  bottomLeft: CONFIG.displays.bottomLeft,
  bottomRight: CONFIG.displays.bottomRight,
  footer: CONFIG.displays.footer,
}

/* Display the next display of the board */
function getNextDisplay(state) {
  const nbDisplays = CONFIG.displays.content.length
  let nextDisplay = state.displayIndex + 1
  if (nextDisplay >= nbDisplays) {
    nextDisplay = 0
  }
  return {
    displayIndex: nextDisplay,
    display: CONFIG.displays.content[nextDisplay],
  }
}

export default (state = initState, action = { type: 'UNKNOWN' }) => {
  switch (action.type) {
    case NEXT_DISPLAY:
      return Object.assign({}, state, getNextDisplay(state))
    default: return state
  }
}
