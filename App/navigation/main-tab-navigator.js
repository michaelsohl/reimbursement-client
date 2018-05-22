import { StackNavigator } from 'react-navigation'
import ListScreen from '../screen/list-screen'
import EditScreen from '../screen/edit-screen'
import ExpensiveListScreen from '../screen/list-expenses-screen'
// import Ionicons from 'react-native-vector-icons/Ionicons'

const mainTabNavigator = StackNavigator({
  ListPage: {
    screen: ListScreen
  },
  ExpensesList: {
    screen: ExpensiveListScreen
  },
  EditExpensesPage: {
    screen: EditScreen
  }
}, {
  initialRouteName: 'ListPage',
  navigationOptions: {
    header: null
  }
})

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
