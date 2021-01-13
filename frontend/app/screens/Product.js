import React, {useState} from 'react'
import {View, Image, StyleSheet, Text, ScrollView, Button} from 'react-native'
import {Left, Right, Container, H1} from 'native-base'
import {useDispatch} from 'react-redux'
import {addToCart} from '../store/actions/cartActions'

const Product = ({route}) => {
  const {params} = route
  const [item, setItem] = useState(params.item)
  const [visibility, setVisibility] = useState('')

  const dispatch = useDispatch()

  return (
    <Container style={styles.container}>
      <ScrollView style={{marginBottom: 80, padding: 5}}>
        <View>
          <Image
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>${item.price}</Text>
        </Left>
        <Right>
          <Button
            title="Add"
            onPress={() => dispatch(addToCart({quantity: 1, item}))}
          />
        </Right>
      </View>
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
})

export default Product
