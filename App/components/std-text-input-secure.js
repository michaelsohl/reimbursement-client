import React from 'react'
import { View } from 'react-native'
import TextField from './text-field'
import { Divider } from 'react-native-elements'

export default function (props) {
  return (
    <View style={styles.container}>
      <TextField placeholder={props.label} placeholderTextColor='grey' value={props.value} onChangeText={props.onChangeText} secureTextEntry={true} />
      <Divider style={{backgroundColor: 'grey'}} />
    </View>
  )
}

const styles = {
  container: {
    height: 35,
    width: 300,
    margin: 20
  }
}
