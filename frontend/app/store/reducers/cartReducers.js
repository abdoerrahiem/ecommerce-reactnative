import * as types from '../types/cartTypes'

const cartReducers = (state = [], action) => {
  const {type, payload} = action

  switch (type) {
    case types.ADD_TO_CART:
      return [...state, payload]
    case types.REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== payload)
    case types.CLEAR_CART:
      return (state = [])
    default:
      return state
  }
}

export default cartReducers
