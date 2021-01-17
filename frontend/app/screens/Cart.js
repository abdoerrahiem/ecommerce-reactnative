import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from 'native-base'
import {useSelector, useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import {SwipeListView} from 'react-native-swipe-list-view'
import {removeFromCart, clearCart} from '../store/actions/cartActions'
import Header from '../components/Header'
import CartItem from '../components/CartItem'

const {height, width} = Dimensions.get('window')

const Cart = () => {
  const cartItems = useSelector((state) => state.cartReducers)

  const dispatch = useDispatch()

  const {navigate} = useNavigation()

  let total = 0
  cartItems.forEach((cart) => (total += cart.item.price))

  return (
    <>
      <Header />
      {cartItems.length > 0 ? (
        <Container>
          <H1 style={{alignSelf: 'center'}}>Cart</H1>
          <SwipeListView
            keyExtractor={(data) => Math.random().toString()}
            data={cartItems}
            renderItem={(data) => <CartItem cart={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => dispatch(removeFromCart(data.item))}>
                  <Icon name="trash" color="white" size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${total}</Text>
            </Left>
            <Right>
              <Button title="Clear" onPress={() => dispatch(clearCart())} />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => navigate('CheckoutNavigator')}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Your cart is empty.</Text>
          <Text>Add products to your cart to get started.</Text>
        </Container>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
})

export default Cart
