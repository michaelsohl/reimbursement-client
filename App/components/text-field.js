import React from 'react' // eslint-disable-line no-unused-vars
import {
  TextInput, // eslint-disable-line no-unused-vars
  View, // eslint-disable-line no-unused-vars
  Text // eslint-disable-line no-unused-vars
} from 'react-native'

export default function (props) {
  return (
    <View style={styles.container}>
      <Text> {props.label} </Text>
      <TextInput style={styles.textField} onChangeText={props.onChangeText} value={props.value} autoCapitalize='none' />
    </View>
  )
}

const styles = {
  container: {
    flex: 1
  },
  textField: {
    height: 30,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    fontSize: 12
  }
}
