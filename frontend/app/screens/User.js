import React, {useContext, useState, useCallback, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native'
import {Container} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import EasyButton from '../components/styledComponents/EasyButton'

import axios from 'axios'
import baseUrl from '../utils/baseUrl'

import AuthGlobal from '../context/store/authGlobal'
import {logoutUser} from '../context/actions/auth'

const User = ({navigation}) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    if (
      context.stateUser.isAuth === false ||
      context.stateUser.isAuth === null
    ) {
      navigation.navigate('Login')
    }

    AsyncStorage.getItem('jwt').then((res) =>
      axios
        .get(`${baseUrl}/users/${context.stateUser.user.id}`, {
          headers: {Authorization: `Bearer ${res}`},
        })
        .then((user) => {
          setUserProfile(user.data)
        })
        .catch((err) => console.log(err)),
    )

    return () => {
      setUserProfile()
    }
  }, [context.stateUser.isAuth])

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{fontSize: 30}}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{margin: 10}}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <EasyButton
            md
            danger
            onPress={() => {
              AsyncStorage.removeItem('jwt')
              logoutUser(context.dispatch)
            }}>
            <Text style={styles.buttonText}>Sign out</Text>
          </EasyButton>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})

export default User
