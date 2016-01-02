import { createStore, applyMiddleware } from 'redux'
import reducer from 'root/stores/reducers'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export default createStoreWithMiddleware(reducer)