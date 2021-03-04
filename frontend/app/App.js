import React from 'react'
import {StatusBar} from 'react-native'
import Navigations from './navigations'

// Redux
import {Provider} from 'react-redux'
import store from './store'

// Context
import Auth from './context/store/auth'

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Navigations />
      </Provider>
    </Auth>
  )
}

export default App
