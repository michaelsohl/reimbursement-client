import { TabNavigator } from 'react-navigation'
import ListScreen from '../screen/list-screen'
import EditScreen from '../screen/edit-screen'
// import Ionicons from 'react-native-vector-icons/Ionicons'

const mainTabNavigator = TabNavigator({
  ListPage: {
    screen: ListScreen
  },
  EditExpensesPage: {
    screen: EditScreen
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
}
)

export default mainTabNavigator

/**
 * {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      if (routeName === 'ListPage') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`
      } else if (routeName === 'EditExpensesPage') {
        iconName = `ios-options${focused ? '' : '-outline'}`
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />
    }
  })}
 */
