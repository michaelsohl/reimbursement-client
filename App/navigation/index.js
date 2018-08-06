
import { createStackNavigator } from 'react-navigation'
import StartScreen from '../screen/start-screen'
import LoginScreen from '../screen/login-screen'
// console.log('LoginScreen:', LoginScreen)
import MainTabNavigator from './main-tab-navigator'
// import React, { Component } from 'react'

export default createStackNavigator({
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  MainApp: MainTabNavigator
},
{
  initialRouteName: 'MainApp',
  navigationOptions: {
    header: null
  }
})
