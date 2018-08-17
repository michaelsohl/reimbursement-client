import React from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import { sylogRed, backgroundColor } from '../themes'
import AddButton from './add-button'
import TrashButton from './trash-button'
import StarButton from './star-button'
import TrashWithStartButton from './trash-star-button'

const headerImage = require('../media/SylogHeader.png')

export default function (props) {
  return (
    <View style={styles.container}>
      <Image source={headerImage} style={styles.headerBackground} />
      <View style={styles.buttonLeftContainer} >
        <Text style={styles.buttonRight} onPress={props.onPress}> {props.buttonName} </Text>
      </View>
      <View style={styles.buttonRightContainer} >
        { props.leftadd ? <AddButton onPress={props.onAddPress} color={sylogRed} /> : null }
        { props.lefttrash ? <TrashButton onPress={props.onPress2} color={sylogRed} /> : null }
        { props.rightstar && !props.isFavoritePressed ? <StarButton colorFill={props.favoriteMode} onPress={props.onStarPress} color={sylogRed} /> : null }
        { props.isFavoritePressed ? <TrashWithStartButton onPress={props.removeFavorite} /> : null}
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
    top: 24
  },
  buttonLeftContainer: {
    position: 'absolute',
    left: 10,
    top: 25,
    backgroundColor: 'white',
    borderRadius: 10
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
