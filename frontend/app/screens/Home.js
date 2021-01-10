import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductCard from '../components/ProductCard'
import HeaderComponent from '../components/Header'
import SearchedProducts from '../components/SearchedProducts'
import Banner from '../components/Banner'
import CategoryFilter from '../components/CategoryFilter'

const data = require('../data/products.json')
const categoriesData = require('../data/categories.json')

const {width, height} = Dimensions.get('window')

const Home = () => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([])
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])

  useEffect(() => {
    setProducts(data)
    setProductsFiltered(data)
    setProductsCtg(data)
    setFocus(false)
    setCategories(categoriesData)
    setInitialState(data)
    setActive(-1)

    return () => {
      setProducts([])
      setProductsFiltered([])
      setProductsCtg([])
      setFocus()
      setActive()
      setCategories([])
      setInitialState([])
    }
  }, [])

  const openList = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const changeCtg = (ctg) =>
    ctg === 'all'
      ? [setProductsCtg(initialState), setActive(true)]
      : [
          setProductsCtg(products.filter((prod) => prod.category.$oid === ctg)),
          setActive(true),
        ]

  return (
    <>
      <HeaderComponent />
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
                  <ProductCard item={item} key={item._id.$oid} />
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height + 120,
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
