import React from 'react' // eslint-disable-line no-unused-vars
import {
  TextInput, // eslint-disable-line no-unused-vars
  View, // eslint-disable-line no-unused-vars
  Text // eslint-disable-line no-unused-vars
} from 'react-native'

export default function (props) {
  return (
    <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
      <TextInput placeholder={props.placeholder} style={styles.textField} onChangeText={props.onChangeText} value={props.value} autoCorrect={false} autoCapitalize='none' secureTextEntry={props.secureTextEntry ? true : false} />
    </View>
  )
}

/**
 * multiline={true} numberOfLines={3}
 */

const styles = {
  container: {
    flex: 1
  },
  textField: {
    height: '100%',
    width: '100%',
    borderColor: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: '100'
  }
}
// fontFamily: Arial, Helvetica, sans-serif
