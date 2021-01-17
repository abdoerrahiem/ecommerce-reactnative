import React from 'react'
import {View, Text} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Checkout from '../screens/Checkout'
import Payment from '../screens/Payment'
import Confirm from '../screens/Confirm'

const Tab = createMaterialTopTabNavigator()

const CheckoutNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{title: 'Shipping'}}
      />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  )
}

export default CheckoutNavigator
