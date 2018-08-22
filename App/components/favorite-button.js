import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { sylogRed } from '../themes'

export default function (props) {
  let containerColor
  let textColor
  if (props.isButtonPressed) {
    containerColor = {backgroundColor: sylogRed}
    textColor = {color: 'white'}
  } else {
    containerColor = {}
    textColor = {}
  }
  return (
    <TouchableOpacity style={[styles.buttonStyle, containerColor]} onPress={props.onPress}>
      <Text style={[styles.textStyle, textColor]}> { props.text } </Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    borderRadius: 10,
    height: 40,
    borderColor: sylogRed,
    borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    margin: 2,
    backgroundColor: 'white',
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
