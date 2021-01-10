import React from 'react'
import {Text, StyleSheet} from 'react-native'

const DefaultText = ({children, style, otherProps}) => (
  <Text style={[styles.text, style]} {...otherProps}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
})

export default DefaultText
