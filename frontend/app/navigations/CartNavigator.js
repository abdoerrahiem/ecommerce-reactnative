import React from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Cart from '../screens/Cart'
import CheckoutNavigator from './CheckoutNavigator'

const Stack = createStackNavigator()

const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen
        name="CheckoutNavigator"
        component={CheckoutNavigator}
        options={({route}) => ({
          title: 'Checkout',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  )
}

export default CartNavigator
