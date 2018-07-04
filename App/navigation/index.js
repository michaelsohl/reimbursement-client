
import { createStackNavigator } from 'react-navigation'
import StartScreen from '../screen/start-screen'
import LoginScreen from '../screen/login-screen'
import MainTabNavigator from './main-tab-navigator'
// import React, { Component } from 'react'

const Apa = createStackNavigator({
  Start: {
    screen: StartScreen
  }
},
{
  initialRouteName: 'Start',
  navigationOptions: {
    header: null
  }
})
console.log('AppNavigator2:', Apa)
export default Apa

/**
 * Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  MainApp: {
    screen: MainTabNavigator
  }
}
 */
