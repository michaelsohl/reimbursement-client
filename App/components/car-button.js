import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} >
        <Text style={{fontFamily: 'Helvetica', fontSize: 20, fontWeight: '100', padding: 5, left: -5}}> { props.label } </Text>
      </TouchableOpacity>
      <Divider style={{backgroundColor: 'grey'}} />
    </View>
  )
}

const styles = {
  container: {
    height: 35,
    position: 'relative',
    width: '100%',
    top: 40
  }
}
