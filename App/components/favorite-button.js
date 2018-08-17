import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function (props) {
  let color
  if (props.isButtonPressed) {
    color = { backgroundColor: 'blue' }
  } else {
    color = {}
  }
  return (
    <TouchableOpacity style={[styles.buttonStyle, color]} onPress={props.onPress}>
      <Text style={styles.textStyle}> {props.text} </Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    height: 40,
    right: 10,
    left: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
