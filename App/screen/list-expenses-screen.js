import React, { Component }from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Expense from '../components/expense'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import { store } from '../redux-store'
import getexpenses from '../redux-store/user-exprenses'
import config from '../config'
import postattest from '../redux-store/attest'

export default class ListExpenseScreen extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.unsubscribe = store.subscribe(() => { this.setState(store.getState()) })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidUpdate () {
    if(this.state.userExpenses.expenseJustAdded) {
      console.log('this particular state:', this.state)
      this.userid = config.testUserId ? config.testUserId : null
      store.dispatch(getexpenses(this.userid))
      this.expensesUpdated()
    }
  }

  expensesUpdated = () => {
    store.dispatch({
      type: 'TURN_OFF_UPDATE_FLAG'
    })
  }

  _setExpenseAttest = (attest) => {
    store.dispatch({
      type: 'TOGGLE_ATTESTS',
      data: attest
    })
  }

  setExpenseAttest = (expenseIndex, expenseId, userId) => {
    store.dispatch({
      type: 'TOGGLE_ATTEST',
      data: {
        monthIndex: this.props.navigation.state.params.monthIndex,
        expenseIndex
      }
    })
    store.dispatch(postattest(userId, expenseId))
  }

  editExpense = () => {
    console.log('editExpense')
  }

  onExpensePress = (expenseIndex, admin, expenseId, userId) => {
    if (admin) {
      this.setExpenseAttest(expenseIndex, expenseId, userId)
    } else {
      this.editExpense()
    }
  }

  goBack = (props) => {
    // console.log('Go Back was pressed!')
    props.navigation.dispatch(NavigationActions.back())
  }
  
  addExpense = (props) => {
    props.navigation.navigate('EditExpensesPage')
  }
  renderExpenses = (arr, admin) => {
    if (!arr) return null
    return arr.map((expense) => {
      console.log('expense1337:', expense)
      return (
        <Expense onPress={() => { this.onExpensePress(arr.indexOf(expense), this.state.userExpenses.admin, expense._id, expense.userId) }} km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} car_type={expense.car_type} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
              Mina utgifter
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { this.renderExpenses(this.state.userExpenses.monthFormattedExpenses[this.props.navigation.state.params.monthIndex], this.state.userExpenses.admin) }
          </ScrollView>
        </View>
      </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textContainer: {
    height: 80,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  expensesContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  }})
