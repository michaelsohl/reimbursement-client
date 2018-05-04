import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { sylogRed, backgroundColor } from '../themes'

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRightContainer} >
        <Text style={styles.buttonRight} onPress={props.onPress}> {props.buttonName} </Text>
      </View>
    </View>
  )
}

const styles = {
  container: {
    width: '100%',
    height: 50,
    // alignItems: 'center',
    backgroundColor
  },
  buttonRightContainer: {
    position: 'absolute',
    right: 10,
    top: 20
  },
  buttonRight: {
    textAlign: 'center',
    color: sylogRed
  }
}
