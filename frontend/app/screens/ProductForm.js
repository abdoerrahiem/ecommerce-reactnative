import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native'
import {Item, Picker} from 'native-base'
import Form from '../components/Form'
import Input from '../components/Input'
import EasyButton from '../components/styledComponents/EasyButton'
import Error from '../components/Error'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-community/async-storage'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

const ProductForm = () => {
  const [pickerValue, setPickerValue] = useState()
  const [brand, setBrand] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [mainImage, setMainImage] = useState()
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [countInStock, setCountInStock] = useState()
  const [rating, setRating] = useState()
  const [isFeatured, setIsFeatured] = useState(false)
  const [richDescription, setRichDescription] = useState()
  const [numReviews, setNumReviews] = useState(0)
  const [item, setItem] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert('Error to load categories'))
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()

    return () => setCategories([])
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setMainImage(result.uri)
      setImage(result.uri)
    }
  }

  return (
    <ScrollView>
      <Form title="Add Product">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: mainImage}} />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Icon name="camera" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Brand</Text>
        </View>
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Count In Stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType="numeric"
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon color="#007aff" name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select your category"
            selectedValue={pickerValue}
            placeholderStyle={{color: '#007aff'}}
            placeholderIconColor="#007aff"
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}>
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </Item>
        {error && <Error message={error} />}
        <View style={styles.buttonContainer}>
          <EasyButton large primary>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  labelText: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#e0e0e0',
    // elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    // elevation: 20,
  },
})

export default ProductForm


// Video 172 belum selesai
