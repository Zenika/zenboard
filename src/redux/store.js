import { createStore } from 'redux'

import reducers from './reducers'

const initState = {}

const store = createStore(reducers, initState)

export default store
