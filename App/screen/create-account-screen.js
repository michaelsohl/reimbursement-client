import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import StdTextInput from '../components/std-text-input'
import StdTextInputSecure from '../components/std-text-input-secure'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import IonIcon from 'react-native-vector-icons/Ionicons'
import CreateAccountButton from '../components/login-button'
import createaccount from '../redux-store/create-account'
const sylogPic = require('../media/Icon-App-83.5x83.5.png')

class CreateAccount extends Component {

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  _createAccount = (data) => {
    const { createAccount} = this.props
    createAccount(data)
    this.goBack()
  }

  render () {
    const { changeEmailText, changePasswordText, email, password, createAccount } = this.props
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} />
        <Image style={styles.headerPicture} source={sylogPic} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            Fyll i personuppgifter
          </Text>
        </View>
        <View style={{flex: 1,width:'100%', left: 20}} >
        <ScrollView>
          <StdTextInput onChangeText={changeEmailText} label={'Skriv in din jobbmejl'} value={email} />
          <StdTextInputSecure onChangeText={changePasswordText} label={'Välj ett lösenord'} />
        </ScrollView>
        </View>
        <CreateAccountButton buttonName='Skapa konto' onPress={() => { this._createAccount({email, password}) }} buttonContainer={styles.buttonContainer} />
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
    fontFamily: 'Helvetica',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  textContainer: {
    height: 50,
    alignItems: 'center'
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
}
