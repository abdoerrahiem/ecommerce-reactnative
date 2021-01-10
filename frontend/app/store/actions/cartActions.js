import * as types from '../types/cartTypes'

export const addToCart = (payload) => {
  return {
    type: types.ADD_TO_CART,
    payload,
  }
}

export const removeFromCart = (payload) => {
  return {
    type: types.REMOVE_FROM_CART,
    payload,
  }
}

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  }
}
