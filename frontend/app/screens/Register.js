import React, {useState} from 'react'
import {View, StyleSheet, Button, Text} from 'react-native'
import Form from '../components/Form'
import Input from '../components/Input'
import Error from '../components/Error'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import Toast from 'react-native-toast-message'
import EasyButton from '../components/styledComponents/EasyButton'

const Register = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError('Please fill in your credential')
      setTimeout(() => {
        setError('')
      }, 2000)

      return
    }

    const user = {
      name,
      email,
      phone,
      password,
      isAdmin: false,
    }

    axios
      .post(`${baseUrl}/users`, user)
      .then((res) => {
        if (res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Succeeded',
            text2: 'Please login into your account',
          })

          setTimeout(() => {
            navigation.navigate('Login')
          }, 2000)
        }
      })
      .catch((error) =>
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        }),
      )
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar
      extraHeight={200}
      enableOnAndroid>
      <Form title="Register">
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder="Phone"
          name="phone"
          id="phone"
          value={phone}
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error !== '' && <Error message={error} />}
        </View>
        <View>
          <EasyButton md primary onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton secondary onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Back To Login</Text>
          </EasyButton>
        </View>
      </Form>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})

export default Register
