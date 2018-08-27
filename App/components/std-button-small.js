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
    height: 30,
    marginLeft: 20
    // backgroundColor: '#C21807'
  }
}
