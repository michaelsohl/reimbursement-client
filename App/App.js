import { StackNavigator } from 'react-navigation'
import StartScreen from './start-screen'
import LoginScreen from './login-screen'
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
  navigationOptions: {
    header: null
  }
})
