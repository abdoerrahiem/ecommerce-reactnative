import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base'
import {useNavigation} from '@react-navigation/native'

const {width} = Dimensions.get('window')

const SearchedProducts = ({productsFiltered}) => {
  const {navigate} = useNavigation()

  return (
    <Content style={{width}}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            key={item._id.$oid}
            avatar
            onPress={() => navigate('Product', {item})}>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>No products found</Text>
        </View>
      )}
    </Content>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SearchedProducts
