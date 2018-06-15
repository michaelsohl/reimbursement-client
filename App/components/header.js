import React from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import { sylogRed, backgroundColor } from '../themes'
import AddButton from './add-button'

const headerImage = require('../media/SylogHeader.png')

export default function (props) {
  return (
    <View style={styles.container}>
      <Image source={headerImage} style={styles.headerBackground} />
      <View style={styles.buttonLeftContainer} >
        { props.leftadd ? <AddButton onPress={props.onAddPress} color={sylogRed} name={'ios-add'} /> : null }
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
    height: 100,
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor
  },
  buttonRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 24,
    backgroundColor: 'white',
    borderRadius: 10
  },
  buttonLeftContainer: {
    position: 'absolute',
    left: 10,
    top: 25
  },
  buttonRight: {
    textAlign: 'center',
    color: sylogRed,
    margin: 5
  },
  headerBackground: {
    width: '100%',
    height: '100%'
  }
}
