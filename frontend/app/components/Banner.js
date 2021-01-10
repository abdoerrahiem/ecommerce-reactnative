import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'
import Swiper from 'react-native-swiper/src'

const {width} = Dimensions.get('window')

const Banner = () => {
  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ])

    return () => {
      setBannerData([])
    }
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper showButtons={true} autoplay={true} autoplayTimeout={5}>
            {bannerData.map((banner) => (
              <Image
                key={banner}
                source={{uri: banner}}
                resizeMode="contain"
                style={styles.imageBanner}
              />
            ))}
          </Swiper>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
    height: 190,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
})

export default Banner
