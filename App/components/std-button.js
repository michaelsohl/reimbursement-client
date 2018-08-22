import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  return (
    <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={styles.container}>
        { props.children }
        <Divider style={{backgroundColor: 'grey'}} />
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  container: {
    width: 300,
    height: 80
    // backgroundColor: '#C21807'
  }
}
