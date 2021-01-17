import React from 'react'
import {View, StyleSheet, Dimensions, ScrollView, Button} from 'react-native'
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import {clearCart} from '../store/actions/cartActions'

const {height, width} = Dimensions.get('window')

const Confirm = ({route, navigation}) => {
  const params = route.params

  const dispatch = useDispatch()

  const confirmOrder = () => {
    setTimeout(() => {
      dispatch(clearCart())
      navigation.navigate('Cart')
    }, 500)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm Order</Text>
        {params && params.order && (
          <View style={{borderWidth: 1, borderColor: 'orange'}}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{padding: 8}}>
              <Text>Address: {params.order.shippingAddress}</Text>
              <Text>Address 2: {params.order.shippingAddress2}</Text>
              <Text>City: {params.order.city}</Text>
              <Text>Zip Code: {params.order.zip}</Text>
              <Text>Country: {params.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {params.order.orderItems.map(({item}) => (
              <ListItem style={styles.listItem} key={item.name} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                    }}
                  />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text>{item.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            ))}
          </View>
        )}
        <View style={{alignItems: 'center', margin: 20}}>
          <Button title="Place Order" onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
    padding: 0,
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default Confirm
