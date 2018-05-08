import { TabNavigator } from 'react-navigation'
import ListScreen from './list-screen'
import EditScreen from './edit-screen'

const mainTabNavigator = TabNavigator({
  ListPage: {
    screen: ListScreen
  },
  EditExpensesPage: {
    screen: EditScreen
  }
}, {
  tabBarPosition: 'bottom'
})

export default mainTabNavigator
