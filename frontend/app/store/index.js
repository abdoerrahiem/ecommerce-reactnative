import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import cartReducers from './reducers/cartReducers'

const reducers = combineReducers({
  cartReducers,
})

// const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  //   initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
