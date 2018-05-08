import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
// import Header from './components/header'
// import store from './redux-store'

export default class ListScreen extends Component {
  componentDidUpdate () {
    console.log('start-screen did update!')
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Lista för utgifter!!1
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
