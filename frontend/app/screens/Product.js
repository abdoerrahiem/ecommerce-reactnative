import React, {useState, useEffect} from 'react'
import {View, Image, StyleSheet, Text, ScrollView, Button} from 'react-native'
import {Left, Right, Container, H1} from 'native-base'
import {useDispatch} from 'react-redux'
import {addToCart} from '../store/actions/cartActions'
import Toast from 'react-native-toast-message'
import EasyButton from '../components/styledComponents/EasyButton'
import TrafficLight from '../components/styledComponents/TrafficLight'

const Product = ({route}) => {
  const {params} = route
  const [item, setItem] = useState(params.item)
  const [availability, setAvailability] = useState(null)
  const [availabilityText, setAvailabilityText] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>)
      setAvailabilityText('Unavailable')
    } else if (item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>)
      setAvailabilityText('Limited')
    } else {
      setAvailability(<TrafficLight available></TrafficLight>)
      setAvailabilityText('Available')
    }
  }, [item])

  console.log(item.countInStock)

  return (
    <Container style={styles.container}>
      <ScrollView style={{marginBottom: 80, padding: 5}}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{marginRight: 5}}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>${item.price}</Text>
        </Left>
        <Right>
          <EasyButton
            md
            primary
            onPress={() => {
              dispatch(addToCart({quantity: 1, item}))

              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${item.name} added to cart`,
                text2: 'Go to your cart to complete your order',
              })
            }}>
            <Text style={styles.buttonText}>Add</Text>
          </EasyButton>
        </Right>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  availabilityContainer: {
    alignItems: 'center',
  },
  availability: {
    marginBottom: 20,
    flexDirection: 'row',
  },
})

export default Product
