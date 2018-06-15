import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} >
        <View style={{width: 200, height: 40}}>
          <Text> { props.label } </Text>
        </View>
      </TouchableOpacity>
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
