
import React, { Component } from 'react'

import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import LoginButton from './components/login-button'
import Header from './components/header'
// import store from './redux-store'
import { StackNavigator } from 'react-navigation'

const sylogPic = require('./media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})


export default class StartScreen extends Component {
  constructor(props, context){
    super(props, context)
  }
   onCreateAccount = () => {
    console.log('Create account button was pressed!')
    this.props.navigation.navigate('Start')
   }

   onLogin = () => {
    console.log('Login button was pressed!')
    this.props.navigation.navigate('Login')
   }



  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Sign in' onPress={this.onLogin}/>
        <Image style={styles.headerPicture} source={sylogPic} />
        <Text style={styles.welcome}>
          Sylog appen är äntligen här!
        </Text>
        <LoginButton buttonName='Create account' onPress={this.onCreateAccount} buttonContainer={styles.buttonContainer} />
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
