
import { createStackNavigator } from 'react-navigation'
import StartScreen from '../screen/start-screen'
import LoginScreen from '../screen/login-screen'
import MainTabNavigator from './main-tab-navigator'

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
