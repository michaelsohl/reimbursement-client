import React from 'react'
import { TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { sylogRed } from '../themes'

export default function (props) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress}>
      <IonIcon color={sylogRed} size={34} name={'ios-add'} />
    </TouchableOpacity>
  )
}

const styles = {
  touchableOpacity: {
    flex: 1,
    // width: 35,
    // height: 35,
    right: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
