import {Platform} from 'react-native'

let baseUrl = ''

Platform.OS === 'android'
  ? (baseUrl = 'http://192.168.100.17:5000/api/v1')
  : (baseUrl = 'hhtp://localhost:5000/api/v1')

export default baseUrl
