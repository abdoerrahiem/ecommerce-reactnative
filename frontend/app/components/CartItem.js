import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base'

const CartItem = ({cart}) => {
  return (
    <ListItem style={styles.listItem} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: cart.item.item.image
              ? cart.item.item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{cart.item.item.name}</Text>
        </Left>
        <Right>
          <Text>${cart.item.item.price}</Text>
        </Right>
      </Body>
    </ListItem>
  )
}

const styles = StyleSheet.create({
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
})

export default CartItem
