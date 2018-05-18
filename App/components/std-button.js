import React from 'react'
import { View, TouchableOpacity } from 'react-native'

export default function (props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        { props.children }
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  container: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#C21807'
  }
}
