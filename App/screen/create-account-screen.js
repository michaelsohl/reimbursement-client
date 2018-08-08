import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import StdTextInput from '../components/std-text-input'
import StdTextInputSecure from '../components/std-text-input-secure'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import IonIcon from 'react-native-vector-icons/Ionicons'
import CreateAccountButton from '../components/login-button'
import createaccount from '../redux-store/create-account'

class CreateAccount extends Component {

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render () {
    const { changeEmailText, changePasswordText, email, password, createAccount } = this.props
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            Fyll i personuppgifter
          </Text>
        </View>
        <ScrollView>
          <StdTextInput onChangeText={changeEmailText} label={'workmail'} value={email} />
          <StdTextInputSecure onChangeText={changePasswordText} label={'password'} />
        </ScrollView>
        <CreateAccountButton buttonName='Skapa konto' onPress={() => { createAccount({email, password}) }} buttonContainer={styles.buttonContainer} />
      </View>
    )
  }
}

/**
 * <IonIcon name={'ios-checkmark'} size={50} />
 */

const mapStateToProps = (state) => {
  return {
    email: state.createAccount.email,
    password: state.createAccount.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmailText: data => { dispatch({ type: 'CHANGE_EMAIL_TEXT', data }) },
    changePasswordText: data => { dispatch({ type: 'CHANGE_PASSWORD_TEXT', data }) },
    createAccount: data => { dispatch(createaccount(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

const buttonThemeColor = '#C21807'
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textContainer: {
    height: 80,
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: buttonThemeColor,
    alignItems: 'center',
    width: '100%'
  }
}
