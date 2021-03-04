import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Button, Text} from 'react-native'
import Form from '../components/Form'
import Input from '../components/Input'
import Error from '../components/Error'
import AuthGlobal from '../context/store/authGlobal'
import {loginUser} from '../context/actions/auth'
import EasyButton from '../components/styledComponents/EasyButton'

const Login = ({navigation}) => {
  const context = useContext(AuthGlobal)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (context.stateUser.isAuth === true) {
      navigation.navigate('User')
    }
  }, [context.stateUser.isAuth])

  const handleSubmit = () => {
    const user = {email, password}

    if (email === '' || password === '') {
      setError('Please fill in your credential')
      setTimeout(() => {
        setError('')
      }, 2000)
    } else {
      loginUser(user, context.dispatch)
    }
  }

  return (
    <Form title="Login">
      <Input
        placeholder="Enter Email"
        name="email"
        id="email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        secureTextEntry
        placeholder="Enter Password"
        name="password"
        id="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error !== '' && <Error message={error} />}
        <EasyButton md primary onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{marginTop: 40}, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          md
          secondary
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </EasyButton>
      </View>
    </Form>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
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

export default Login
