import React from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../screens/Login'
import Register from '../screens/Register'
import User from '../screens/User'

const Stack = createStackNavigator()

const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  )
}

export default UserNavigator
