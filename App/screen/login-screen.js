
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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const sylogPic = require('../media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
    
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

class LoginScreen extends Component {
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

   onChangeText = (text) => {
    // this.props.onChangeLoginTextActionCreator(text)
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
    // this.unsubscribe()
   }

  render () {
    // console.log('STATE in login-screen:', this.state)
    let button = null
    if(this.state.loginEmail.data) {
      button = <LoginButton buttonName='Login' onPress={this.login} />
    }
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' leftadd={false} onPress={this.goBack}/>
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

/*
function onChangeLoginTextActionCreator(text) {
  return {
   type: 'LOGIN_EMAIL',
   text
 }
}

function mapStateToProps(state) {
  return {
    loginEmail: state.loginEmail
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({onChangeLoginTextActionCreator: onChangeLoginTextActionCreator}, dispatch)
}
*/
// export default connect(mapStateToProps, matchDispatchToProps)(LoginScreen)

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
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
