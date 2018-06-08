import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Divider
} from 'react-native'
import Header from '../components/header'
import { createstore } from '../redux-store'
import getexpenses from '../redux-store/user-exprenses'
import Expense from '../components/expense'
import Month from '../components/month'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'



export default class ListScreen extends Component {
  constructor(props){
    super(props)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
  }
  componentDidMount() {
    // console.log('componentDidMount')
    if(this.props.navigation) {
      // this.props.navigation.state.params.userId
      createstore.dispatch(getexpenses('5b1a3041d0b073e34a45d855'))
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  signout = () => {
    this.props.navigation.navigate('Start')
  }

  setMonthScreen = (index) => {
    createstore.dispatch({
      type: 'SET_MONTH_SCREEN',
      index
    })
  }

  goBack = () => {
    // console.log('Go Back was pressed!')
    this.props.navigation.dispatch(NavigationActions.back())
   }
  
  renderExpenses = (arr) => {
    if(!arr) return null
    return arr.map((expense) => { 
      return (
        <Expense date={expense.date} attest={expense.attest} descr={expense.route_descr} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  componentDidUpdate () {
    if(this.state.userExpenses.expenseJustAdded) {
      createstore.dispatch(getexpenses('5b1a3041d0b073e34a45d855'))
      this.expensesUpdated()
    }
  }

  expensesUpdated = () => {
    createstore.dispatch({
      type: 'TURN_OFF_UPDATE_FLAG'
    })
  }

  addExpense = (props) => {
    props.navigation.navigate('EditExpensesPage')
  }

  onMonthPress = (arr, index) => {
    this.setMonthScreen(index)
    this.props.navigation.navigate('ExpensesList', {monthIndex: index})
  }

  renderMonths = (arr) => {
    if(!arr) return null
    let index = 0
    return arr.map((month) => { 
      let m = new Date(month[0].date)
      return (
        <Month onPress={() => { this.onMonthPress(arr, arr.indexOf(month)) }} year={m.getFullYear()} month={m.getMonth()} attest={month[0].attest} descr={month[0].route_descr} key={month[0]._id} />
      )
    })
  }
/**
 * { this.state.userExpenses.monthIndex === arr.indexOf(month) ? this.renderExpenses(month) : null }
 */


  render () {
    console.log('HERE IS LIST_SCREEN STATE:', this.state)
    return (
      <View style={styles.container}>
        <Header buttonName='Sign out' onPress={this.signout} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            Mina utgifter
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { this.renderMonths(this.state.userExpenses.monthFormattedExpenses) }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    height: 80,
    alignItems: 'center',
  },
  expensesContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: buttonThemeColor,
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  }
})
