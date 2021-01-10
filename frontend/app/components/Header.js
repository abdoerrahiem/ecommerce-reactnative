import React from 'react'
import {StyleSheet, Image, SafeAreaView, View} from 'react-native'

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/img/Logo.png')}
        resizeMode="contain"
        style={{height: 40}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
  },
})

export default Header
