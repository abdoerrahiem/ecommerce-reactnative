import React from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Cart from '../screens/Cart'
import Checkout from '../screens/Checkout'

const Stack = createStackNavigator()

const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({route}) => ({
          //   title: route.params.item.name,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  )
}

export default CartNavigator
