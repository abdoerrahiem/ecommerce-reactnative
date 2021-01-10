import React from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/Home'
import Product from '../screens/Product'

const Stack = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({
          title: route.params.item.name,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator
