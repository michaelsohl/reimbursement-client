import React, { Component } from 'react'
import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import debounce from 'debounce'
import { NavigationActions } from 'react-navigation'
import LoginButton from '../components/login-button'
import Header from '../components/header'
import emailvalidation from '../redux-store/email-validation'
import TextField from '../components/text-field'
import { connect } from 'react-redux'
const sylogPic = require('../media/Icon-App-83.5x83.5.png')
import StdTextInput from '../components/std-text-input'
import StdTextInputSecure from '../components/std-text-input-secure'

// const _validateEmail = (text, cb) => {
//  return debounce(cb , 2000)
// }

class LoginScreen extends Component {

  // _validateEmail = (text) => {
  //  store.dispatch(emailvalidation(text))
  // }

   goBack = () => {
     this.props.navigation.dispatch(NavigationActions.back())
   }

   onChangeText = (text) => {
     const { loginEmail, validateEmail } = this.props
    // this.props.onChangeLoginTextActionCreator(text)
    loginEmail(text)
    // validateEmail({email: loginEmail, password: loginPassword}})
  }

  onChangePassword = (text) => {
    const { value, validateEmail, loginPassword } = this.props
    loginPassword(text)
    validateEmail({email: value, password: text})
  }

  login = () => {
    const { userId } = this.props
    this.props.navigation.navigate('MainApp', { userId })
  }

  render () {
    let button = null
    const { value, data, password } = this.props
    if(data) {
      button = <LoginButton buttonName='Login' onPress={this.login} />
    }
 
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() } } onPressOut={() => { } } >
      <View style={styles.container}>
        <Header buttonName='Avbryt' leftadd={false} onPress={this.goBack}/>
        <Image style={styles.headerPicture} source={sylogPic} />
          <Text style={styles.welcome}>
            Login
          </Text>
          <View style={{flex: 1,width:'100%', left: 20}} >
          <ScrollView>
            <StdTextInput label='Skriv in din jobbmejl' onChangeText={this.onChangeText} value={value} />
            <StdTextInputSecure label='Lösenord' onChangeText={this.onChangePassword} value={password} />
          </ScrollView>
          </View>
        { button }
      </View>
      </ TouchableWithoutFeedback>
    )
  }
}

/**
 * <StdTextInput label='Enter work-email' onChangeText={this.onChangeText} value={value} />
          <StdTextInputSecure label='Enter password' onChangeText={this.onChangePassword} value={password} />
 */

const mapStateToProps = (state) => {
  return { 
    value: state.loginEmail.value,
    data: state.loginEmail.data,
    email: state.loginEmail.value,
    password: state.loginEmail.password,
    userId: state.loginEmail.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginEmail: (text) => {
      dispatch({
        type: 'LOGIN_EMAIL',
        text
      })
    },
    loginPassword: (text) => {
      dispatch({
        type: 'LOGIN_PASSWORD',
        text
      })
    },
    validateEmail: (data) => {
      dispatch(emailvalidation(data))
    }        
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerPicture: {
    alignItems: 'center',
    height: 100,
    width: 100,
    margin: 40
  },
  textFieldContainer: {
    flex: 1
  }
})
