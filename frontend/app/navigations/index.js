// import React from 'react'
// import {StyleSheet} from 'react-native'
// import {NavigationContainer} from '@react-navigation/native'
// import {createStackNavigator} from '@react-navigation/stack'
// import Products from '../screens/Products'
// import DefaultText from '../components/DefaultText'
// import colors from '../utils/colors'

// const Stack = createStackNavigator()

// export default () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{animationEnabled: false, headerShown: false}}>
//         <Stack.Screen
//           name="Products"
//           component={Products}
//           options={{
//             title: <DefaultText style={styles.title}>Products</DefaultText>,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// const styles = StyleSheet.create({
//   title: {
//     color: colors.black,
//     fontSize: 20,
//     fontFamily: 'Quicksand-Bold',
//   },
// })

import React from 'react'
import {View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import HomeNavigator from './HomeNavigator'
import Cart from '../screens/Cart'
import Admin from '../screens/Admin'
import User from '../screens/User'

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeNavigator"
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name="home"
                style={{position: 'relative', color}}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name="shopping-cart"
                style={{position: 'relative', color}}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name="cog"
                style={{position: 'relative', color}}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name="user"
                style={{position: 'relative', color}}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
