import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import ZenBoard from './zenboard/ZenBoard'

render(
  <Provider store={store}>
    <ZenBoard />
  </Provider>
  , document.getElementById('app')
)
