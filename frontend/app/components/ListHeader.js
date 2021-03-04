import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const {height, width} = Dimensions.get('window')

const ListHeader = () => {
  return (
    <View style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Price</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  headerText: {
    fontWeight: 'bold',
  },
})

export default ListHeader
