import React from 'react'
import { TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { sylogRed } from '../themes'

export default function (props) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress}>
      <IonIcon color={sylogRed} size={25} name={'ios-trash'} />
      <IonIcon style={{position: 'absolute', top: 5, left: 1}} color={sylogRed} size={15} name={'ios-star'} />
    </TouchableOpacity>
  )
}

const styles = {
  touchableOpacity: {
    flex: 1,
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
