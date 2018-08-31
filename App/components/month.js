import React from 'react'
import { Text } from 'react-native'
import StdButton from './std-button'
import { Months } from '../lib/dates'

export default function (props) {
  return (
    <StdButton onPress={props.onPress} onLongPress={props.onLongPress} >
      <Text style={{fontFamily: 'Helvetica', fontSize: 20, fontWeight: '400'}}> { Months[props.month + 1] }  </Text>
      <Text style={{fontSize: 15, fontFamily: 'Helvetica', fontWeight: '100'}}> {props.year} </Text>
    </StdButton>
  )
}

//     <Text style={{fontSize: 15, fontFamily: 'Helvetica', fontWeight: '100'}}>  Reseutlägg </Text> removed item
