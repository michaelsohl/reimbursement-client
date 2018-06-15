import React from 'react'
import { View } from 'react-native'
export default function (props) {
  return (
    <View style={{ height: props.size, width: props.size, borderRadius: 4, backgroundColor: props.color, right: 10 }} />)
}
