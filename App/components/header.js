import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { sylogRed, backgroundColor } from '../themes'
import IonIcon from 'react-native-vector-icons/Ionicons'

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonLeftContainer} >
        { props.leftadd ? <IonIcon onPress={props.onAddPress} color={sylogRed} size={40} name={'ios-add'} /> : null }
      </View>
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
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor
  },
  buttonRightContainer: {
    position: 'absolute',
    right: 10,
    top: 25
  },
  buttonLeftContainer: {
    position: 'absolute',
    left: 10,
    top: 15
  },
  buttonRight: {
    textAlign: 'center',
    color: sylogRed
  }
}
