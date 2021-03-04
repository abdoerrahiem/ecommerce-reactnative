import React from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Orders from '../screens/Orders'
import Products from '../screens/Products'
import ProductForm from '../screens/ProductForm'
import Categories from '../screens/Categories'

const Stack = createStackNavigator()

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: true,
          title: 'Products',
        }}
      />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
      <Stack.Screen name="Categories" component={Categories} />
    </Stack.Navigator>
  )
}

export default AdminNavigator
