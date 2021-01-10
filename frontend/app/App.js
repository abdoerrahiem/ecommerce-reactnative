import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import Navigations from './navigations'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Navigations />
    </Provider>
  )
}

export default App
