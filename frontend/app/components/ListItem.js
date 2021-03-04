import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Button,
  Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import EasyButton from '../components/styledComponents/EasyButton'

const {width, height} = Dimensions.get('window')

const ListItem = ({item, index, handleDelete}) => {
  const [showModal, setShowModal] = useState(false)

  const {navigate} = useNavigation()

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              underlayColor="#e8e8e8"
              onPress={() => setShowModal(false)}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}>
              <Icon name="close" size={20} />
            </TouchableHighlight>
            <EasyButton
              md
              secondary
              onPress={() => {
                navigate('ProductForm')
                setShowModal(false)
              }}>
              <Text style={styles.modalText}>Edit</Text>
            </EasyButton>
            <EasyButton
              md
              danger
              onPress={() => [handleDelete(item.id), setShowModal(false)]}>
              <Text style={styles.modalText}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: index % 2 === 0 ? 'white' : 'gainsboro',
          },
        ]}
        onPress={() => navigate('Product', {item})}
        onLongPress={() => setShowModal(true)}>
        <Image
          source={{
            uri: item.image
              ? item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {item.brand}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {item.category.name}
        </Text>
        <Text style={styles.item}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})

export default ListItem

// Video 162
