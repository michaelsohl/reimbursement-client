import { TabNavigator } from 'react-navigation'
import ListScreen from '../screen/list-screen'
import EditScreen from '../screen/edit-screen'

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
