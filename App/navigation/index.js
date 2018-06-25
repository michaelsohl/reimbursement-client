/** 
import { StackNavigator } from 'react-navigation'
import StartScreen from '../screen/start-screen'
import LoginScreen from '../screen/login-screen'
import MainTabNavigator from './main-tab-navigator'

export default StackNavigator({
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  MainApp: {
    screen: MainTabNavigator
  }
},
{
  initialRouteName: 'MainApp',
  navigationOptions: {
    header: null
  }
})
*/

// import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { StackNavigator } from 'react-navigation'
import StartScreen from '../screen/start-screen'
import LoginScreen from '../screen/login-screen'
import MainTabNavigator from './main-tab-navigator'
// import React, { Component } from 'react'
// import { connect } from 'react-redux'

const Nav = StackNavigator({
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  MainApp: {
    screen: MainTabNavigator
  }
},
{
  initialRouteName: 'MainApp',
  navigationOptions: {
    header: null
  }
})

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
 */
/*
class MainNavigator extends Component {
  render () {
    return (
      <Nav navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation
      })} />
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation
})
*/
// export default connect(mapStateToProps)(MainNavigator)
export default Nav

/**
 * GITHUB hjälp: class Nav extends Component {
  render() {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })} />
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
})

export default connect(mapStateToProps)(Nav)
 */
