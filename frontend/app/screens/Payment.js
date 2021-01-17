import React, {useState} from 'react'
import {View, Button} from 'react-native'
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from 'native-base'

const methods = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Card Payment', value: 3},
]

const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
]

const Payment = ({route, navigation}) => {
  const params = route.params

  const [selected, setSelected] = useState()
  const [card, setCard] = useState()

  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((method) => (
          <ListItem
            key={method.value}
            onPress={() => setSelected(method.value)}>
            <Left>
              <Text>{method.name}</Text>
            </Left>
            <Right>
              <Radio selected={selected == method.value} />
            </Right>
          </ListItem>
        ))}
        {selected == 3 && (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={card}
            headerStyle={{backgroundColor: 'orange'}}
            headerBackButtonTextStyle={{color: '#fff'}}
            headerTitleStyle={{color: '#fff'}}
            onValueChange={(e) => setCard(e)}>
            {paymentCards.map((c) => (
              <Picker.Item key={c.value} label={c.name} value={c.name} />
            ))}
          </Picker>
        )}
        <View style={{marginTop: 60, alignSelf: 'center'}}>
          <Button
            title="Continue"
            onPress={() =>
              navigation.navigate('Confirm', {order: params.order})
            }
          />
        </View>
      </Content>
    </Container>
  )
}

export default Payment
