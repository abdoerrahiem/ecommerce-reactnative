import {SET_CURRENT_USER} from '../actions/auth'
import isEmpty from '../../utils/isEmpty'

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      }
    default:
      return state
  }
}
