import React, {useEffect, useState} from 'react'
import {View, Text, Button} from 'react-native'
import {Item, Picker} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSelector, useDispatch} from 'react-redux'
import Form from '../components/Form'
import Input from '../components/Input'

const countries = require('../data/countries.json')

const Checkout = ({navigation}) => {
  const [orderItems, setOrderItems] = useState()
  const [address, setAddress] = useState()
  const [address2, setAddress2] = useState()
  const [city, setCity] = useState()
  const [zip, setZip] = useState()
  const [country, setCountry] = useState()
  const [phone, setPhone] = useState()

  const cartItems = useSelector((state) => state.cartReducers)

  useEffect(() => {
    setOrderItems(cartItems)

    return () => setOrderItems()
  }, [])

  const checkOut = () => {
    let order = {
      city,
      country,
      orderItems,
      phone,
      shippingAddress: address,
      shippingAddress2: address2,
      zip,
    }

    navigation.navigate('Payment', {order})
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar
      extraHeight={300}
      enableOnAndroid>
      <Form title="Shipping Address">
        <Input
          placeholder="Phone"
          name="phone"
          value={phone}
          keyboardType="numeric"
          onChangeText={(e) => setPhone(e)}
        />
        <Input
          placeholder="Shipping Address 1"
          name="shippingAddress1"
          value={address}
          onChangeText={(e) => setAddress(e)}
        />
        <Input
          placeholder="Shipping Address 2"
          name="shippingAddress2"
          value={address2}
          onChangeText={(e) => setAddress2(e)}
        />
        <Input
          placeholder="City"
          name="city"
          value={city}
          onChangeText={(e) => setCity(e)}
        />
        <Input
          placeholder="Zip Code"
          name="zip"
          value={zip}
          keyboardType="numeric"
          onChangeText={(e) => setZip(e)}
        />
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color="#007aff" />}
            style={{width: undefined}}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{color: '#007aff'}}
            placeholderIconColor="#007aff"
            onValueChange={(e) => console.log(e)}>
            {countries.map((c) => (
              <Picker.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Picker>
        </Item>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </Form>
    </KeyboardAwareScrollView>
  )
}

export default Checkout
