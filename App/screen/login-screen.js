
import React, { Component } from 'react'

import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput
} from 'react-native'
import debounce from 'debounce'
import { NavigationActions } from 'react-navigation'
import LoginButton from '../components/login-button'
import Header from '../components/header'
import { createstore, emailvalidation } from '../redux-store'
import TextField from '../components/text-field'
import EventEmitter from '../event-handler'
console.log(debounce)

const sylogPic = require('../media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
    
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})


export default class LoginScreen extends Component {
  constructor(props, context){
    super(props, context)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
    this.validateEmail = debounce(this._validateEmail , 2000)
  }

  _validateEmail = (text) => {
    createstore.dispatch(emailvalidation(text))
  }

   goBack = () => {
    // console.log('Go Back was pressed!')
    this.props.navigation.dispatch(NavigationActions.back())
   }

   runstuff = (text) => {
    createstore.dispatch({
      type: 'LOGIN_EMAIL',
      text
    })
   }

   onChangeText = (text) => {
    createstore.dispatch({
      type: 'LOGIN_EMAIL',
      text
    })
    this.validateEmail(text)
  }

  login = () => {
    this.props.navigation.navigate('MainApp', {userId: this.state.loginEmail.userId})
  }

   componentWillUnmount(){
    this.unsubscribe()
   }

  render () {
    // console.log('STATE in login-screen:', this.state.loginEmail.userId)
    let button = null
    if(this.state.loginEmail.data) {
      button = <LoginButton buttonName='Login' onPress={this.login} buttonContainer={styles.buttonContainer} />
    }
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={this.goBack}/>
        <Image style={styles.headerPicture} source={sylogPic} />
        <View> style={styles.textFieldContainer}
          <Text style={styles.welcome}>
            Enter the app here
          </Text>
          <TextField label='Enter work-email' onChangeText={this.onChangeText} value={this.state.loginEmail.value} />
        </View>
        { button }
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
    marginBottom: 20,
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
    width: 100,
    margin: 40
  },
  textFieldContainer: {
    flex: 1
  }

})
