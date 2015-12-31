import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export default createStoreWithMiddleware(reducer)