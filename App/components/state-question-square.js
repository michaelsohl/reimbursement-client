import React from 'react'
import { View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

export default function (props) {
  return (
    <View style={{ height: props.size, width: props.size, borderRadius: 4, backgroundColor: props.color, right: 10, justifyContent: 'center', alignItems: 'center' }} >
      <IonIcon color={'white'} size={18} name={'ios-help'} />
    </View>)
}
