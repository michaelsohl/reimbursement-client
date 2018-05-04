
import React, { Component } from 'react'
import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import LoginButton from './components/login-button'

const sylogPic = require('./media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

export default class App extends Component {
  
   onLogin = () => {
    console.log('Login button was pressed!')
   }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.headerPicture} source={sylogPic} />
        <Text style={styles.welcome}>
          Sylog appen är äntligen här!
        </Text>
        <LoginButton buttonName='Login here' onPress={this.onLogin} buttonContainer={styles.buttonContainer} />
      </View>
    )
  }
}

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
    backgroundColor: '#C21807',
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  }

})
