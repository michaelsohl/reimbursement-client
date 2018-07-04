import React from 'react' // eslint-disable-line no-unused-vars
import {
  TextInput, // eslint-disable-line no-unused-vars
  View, // eslint-disable-line no-unused-vars
  Text // eslint-disable-line no-unused-vars
} from 'react-native'

export default function (props) {
  return (
    <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
      <TextInput placeholder={props.placeholder} style={styles.textField} onChangeText={props.onChangeText} value={props.value} autoCorrect={false} autoCapitalize='none' multiline={true} numberOfLines={3} />
    </View>
  )
}

const styles = {
  container: {
    flex: 1
  },
  textField: {
    height: 30,
    width: 250,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    fontSize: 12
  }
}
