import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

export default function (props) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={{color: 'white', textAlign: 'center'}}> { props.buttonName } </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  button: {
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: '#C21807',
    alignItems: 'center',
    width: '100%'
  }
}
