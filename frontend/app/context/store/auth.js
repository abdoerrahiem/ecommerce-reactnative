import React, {useReducer, useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'

import authReducer from '../reducers/auth'
import {setCurrentUser} from '../actions/auth'
import AuthGlobal from './authGlobal'

const Auth = ({children}) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuth: null,
    user: {},
  })
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : ''
      if (showChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)))
      }
    }

    return () => setShowChild(false)
  }, [])

  if (!showChild) {
    return null
  } else {
    return (
      <AuthGlobal.Provider value={{stateUser, dispatch}}>
        {children}
      </AuthGlobal.Provider>
    )
  }
}

export default Auth
