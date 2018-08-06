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
// import { NavigationActions } from 'react-navigation' 1
import LoginButton from '../components/login-button'
import Header from '../components/header'
import emailvalidation from '../redux-store/email-validation'
import TextField from '../components/text-field'
import { connect } from 'react-redux'
const sylogPic = require('../media/Icon-App-83.5x83.5.png')
import StdTextInput from '../components/std-text-input'

// const _validateEmail = (text, cb) => {
//  return debounce(cb , 2000)
// }

class LoginScreen extends Component {

  // _validateEmail = (text) => {
  //  store.dispatch(emailvalidation(text))
  // }

   // goBack = () => {
    // console.log('Go Back was pressed!')
    //this.props.navigation.dispatch(NavigationActions.back())
   //}

   onChangeText = (text) => {

     const { loginEmail, validateEmail } = this.props
    // this.props.onChangeLoginTextActionCreator(text)
    loginEmail(text)
    validateEmail(text)
  }

  login = () => {
    const { userId } = this.props
    console.log('this.state:', this.state)
    this.props.navigation.navigate('MainApp', { userId })
  }

  render () {
    // console.log('STATE in login-screen:', this.state)
    let button = null
    const { value, data } = this.props
    if(data) {
      button = <LoginButton buttonName='Login' onPress={this.login} />
    }
    return (
      <TouchableWithoutFeedback 
      onPress={() => {  
        console.log('hejsan keybord dismiss #########################################') 
        Keyboard.dismiss()} }
      onPressOut={() => { console.log('hejsan keybord dismiss 22222 #########################################')  } } >
      <View style={styles.container}>
        <Header buttonName='Cancel' leftadd={false} onPress={this.goBack}/>
        <Image style={styles.headerPicture} source={sylogPic} />
        <View> style={styles.textFieldContainer}
          <Text style={styles.welcome}>
            Enter the app here
          </Text>
          <StdTextInput label='Enter work-email' onChangeText={this.onChangeText} value={value} />
        </View>
        { button }
      </View>
      </ TouchableWithoutFeedback>
    )
  }
}



const mapStateToProps = (state) => {
  return { 
    value: state.loginEmail.value,
    data: state.loginEmail.data,
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
    validateEmail: (text) => {
      dispatch(emailvalidation(text))
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
