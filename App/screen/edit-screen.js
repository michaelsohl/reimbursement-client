import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class EditScreen extends Component {
  componentDidUpdate () {
    console.log('edit-screen did update!')
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Redigera dina utgifter nedan
        </Text>
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: buttonThemeColor,
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  }
})
