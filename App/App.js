import { StackNavigator } from 'react-navigation'
import StartScreen from './start-screen'
import LoginScreen from './login-screen'

export default StackNavigator({
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  }
},
{
  navigationOptions: {
    header: null
  }
})
