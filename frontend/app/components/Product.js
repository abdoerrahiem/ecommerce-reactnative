import React from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'
import ProductCard from './ProductCard'

const {width} = Dimensions.get('window')

const Product = ({item}) => {
  return (
    // <TouchableOpacity
    //   style={{flexDirection: 'row', width, backgroundColor: 'red', padding}}>
    //   <ProductCard {...item} />
    // </TouchableOpacity>
  )
}

export default Product
