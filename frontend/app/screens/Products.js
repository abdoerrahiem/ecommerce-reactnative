import React, {useState, useCallback} from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native'
import {Header, Item, Input} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useFocusEffect} from '@react-navigation/native'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import AsyncStorage from '@react-native-community/async-storage'
import ListItem from '../components/ListItem'
import ListHeader from '../components/ListHeader'
import EasyButton from '../components/styledComponents/EasyButton'

const {height, width} = Dimensions.get('window')

const Products = ({navigation}) => {
  const [productList, setProductList] = useState()
  const [productFilter, setProductFilter] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('jwt')
        .then((res) => setToken(res))
        .catch((error) => console.log(error))

      axios.get(`${baseUrl}/products`).then((res) => {
        setProductList(res.data)
        setProductFilter(res.data)
        setLoading(false)
      })

      return () => {
        setProductList()
        setProductFilter()
        setLoading(true)
      }
    }, []),
  )

  const handleChange = (text) => {
    console.log(text)
    if (text === '') {
      setProductFilter(productList)
    } else {
      console.log(text)

      setProductFilter(
        productList.filter((product) =>
          product.name.toLowerCase().includes(text.toLowerCase()),
        ),
      )
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })

      setProductFilter(productFilter.filter((product) => product.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton md secondary onPress={() => navigation.navigate('Orders')}>
          <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.textButton}>Orders</Text>
        </EasyButton>
        <EasyButton
          md
          secondary
          onPress={() => navigation.navigate('ProductForm')}>
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.textButton}>Product</Text>
        </EasyButton>
        <EasyButton
          md
          secondary
          onPress={() => navigation.navigate('Categories')}>
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.textButton}>Categories</Text>
        </EasyButton>
      </View>
      <View>
        <Header searchBar rounded>
          <Item style={{padding: 5}}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => handleChange(text)}
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({item, index}) => (
            <ListItem item={item} index={index} handleDelete={handleDelete} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textButton: {
    marginLeft: 4,
    color: '#fff',
  },
})

export default Products
