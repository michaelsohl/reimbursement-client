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
