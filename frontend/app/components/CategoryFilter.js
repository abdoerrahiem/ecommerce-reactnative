import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  View,
} from 'react-native'
import {ListItem, Badge, Text} from 'native-base'

const {width} = Dimensions.get('window')

const CategoryFilter = ({changeCtg, setActive, active, categories}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      bounces={true}
      horizontal={true}
      style={{
        backgroundColor: '#f2f2f2',
        width,
        paddingVertical: 6,
        // height: 80
      }}>
      <TouchableOpacity
        onPress={() => {
          changeCtg('all')
          setActive('all')
        }}>
        <Badge
          style={[
            styles.center,
            {margin: 5},
            active === 'all' ? styles.active : styles.inactive,
          ]}>
          <Text style={{color: '#fff'}}>All</Text>
        </Badge>
      </TouchableOpacity>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => {
            changeCtg(item._id)
            setActive(index)
          }}>
          <Badge
            style={[
              styles.center,
              {margin: 5},
              active === index ? styles.active : styles.inactive,
            ]}>
            <Text style={{color: '#fff'}}>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
})

export default CategoryFilter
