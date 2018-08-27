import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
        { props.children }
        <Divider style={{backgroundColor: 'grey'}} />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: {
    height: 80,
    width: '100%',
    top: 40
    // backgroundColor: '#C21807'
  }
}
