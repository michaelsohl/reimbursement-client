
import React, { Component } from 'react'

import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import CreateAccountButton from '../components/login-button'
import Header from '../components/header'
// import store from './redux-store'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'


const sylogPic = require('../media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})


export default class StartScreen extends Component {
  
   onCreateAccount = () => {
    this.props.navigation.navigate('Create')
   }

   onLogin = () => {
    this.props.navigation.navigate('Login')
   }

  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Logga in' leftadd={false} onPress={this.onLogin}/>
        <Image style={styles.headerPicture} source={sylogPic} />
        <Text style={styles.welcome}>
          Reseersättningsappen
        </Text>
        <CreateAccountButton buttonName='Skapa konto' onPress={this.onCreateAccount} buttonContainer={styles.buttonContainer} />
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
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
    width: 100,
    margin: 40
  }
})
