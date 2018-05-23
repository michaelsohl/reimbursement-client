import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import ExpenseForm from '../components/ExpenseForm'

export default class EditScreen extends Component {

  constructor(props) {
    super(props)
  }
  
  componentDidUpdate () {
    console.log('edit-screen did update!')
  }

  goBack = (props) => {
    // console.log('Go Back was pressed!')
    props.navigation.dispatch(NavigationActions.back())
  }


  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        <ExpenseForm />
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
  textContainer: {
    height: 80,
    alignItems: 'center',
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
