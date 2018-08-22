import React from 'react'
import { View, TextInput } from 'react-native'

export default function (props) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={'Skriv gärna en kommentar ... '} onChangeText={props.onChangeText} value={props.comment} autoCorrect={false} autoCapitalize='none' multiline={true} numberOfLines={4} />
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 100,
    width: 200,
    padding: 10
  }
}
