import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {addToCart} from '../store/actions/cartActions'
import Toast from 'react-native-toast-message'
import EasyButton from '../components/styledComponents/EasyButton'

const {width} = Dimensions.get('window')

const ProductCard = ({item}) => {
  const {name, price, image, countInStock} = item

  const {navigate} = useNavigation()

  const dispatch = useDispatch()

  // const cartItems = useSelector((state) => state.cartReducers)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('Product', {item})}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
        resizeMode="contain"
      />
      <View style={styles.card}>
        <Text style={styles.title}>
          {name.length > 15 ? `${name.substring(0, 15 - 3)}` : name}
        </Text>
        <Text style={styles.price}>${price}</Text>
        {countInStock > 0 ? (
          <View style={{marginBottom: 60}}>
            <EasyButton
              primary
              onPress={() => {
                dispatch(addToCart({quantity: 1, item}))

                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${name} added to cart`,
                  text2: 'Go to your cart to complete your order',
                })
              }}>
              <Text style={styles.buttonText}>Add</Text>
            </EasyButton>
          </View>
        ) : (
          <Text style={{marginTop: 20}}>Currently Unavailable</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 5,
    marginTop: 55,
    marginBottom: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: width / 2 - 20 - 30,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -50,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})

export default ProductCard
