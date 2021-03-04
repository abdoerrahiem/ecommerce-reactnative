import React, {useState, useEffect, useCallback} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductCard from '../components/ProductCard'
import HeaderComponent from '../components/Header'
import SearchedProducts from '../components/SearchedProducts'
import Banner from '../components/Banner'
import CategoryFilter from '../components/CategoryFilter'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {useFocusEffect} from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const {width, height} = Dimensions.get('window')

const Home = () => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([])
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setFocus(false)
      setActive(-1)

      axios
        .get(`${baseUrl}/products`)
        .then((res) => {
          setProducts(res.data)
          setProductsFiltered(res.data)
          setProductsCtg(res.data)
          setInitialState(res.data)
          setLoading(false)
        })
        .catch((err) => console.log('API Error'))

      axios
        .get(`${baseUrl}/categories`)
        .then((res) => {
          setCategories(res.data)
          setLoading(false)
        })
        .catch((err) => console.log('API Error'))

      return () => {
        setProducts([])
        setProductsFiltered([])
        setProductsCtg([])
        setFocus()
        setActive()
        setCategories([])
        setInitialState([])
      }
    }, []),
  )

  const openList = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const changeCtg = (ctg) =>
    ctg === 'all'
      ? [setProductsCtg(initialState), setActive(true)]
      : [
          setProductsCtg(products.filter((prod) => prod.category._id === ctg)),
          setActive(true),
        ]

  return (
    <>
      <HeaderComponent />
      {loading ? (
        <Container style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      ) : (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) =>
                  setProductsFiltered(
                    products.filter((prod) =>
                      prod.name.toLowerCase().includes(text.toLowerCase()),
                    ),
                  )
                }
              />
              {focus && <Icon onPress={onBlur} name="ios-close" />}
            </Item>
          </Header>
          {focus ? (
            <SearchedProducts productsFiltered={productsFiltered} />
          ) : (
            <ScrollView>
              <Banner />
              <CategoryFilter
                categories={categories}
                changeCtg={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
              {productsCtg.length > 0 ? (
                <View style={styles.container}>
                  {productsCtg.map((item) => (
                    <ProductCard item={item} key={item._id} />
                  ))}
                </View>
              ) : (
                <View style={styles.center}>
                  <Text>No products found</Text>
                </View>
              )}
            </ScrollView>
          )}
        </Container>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: height + 120,
    width,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  center: {
    height: height / 2,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
  },
})

export default Home
