import React, { Component }from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Expense from '../components/expense'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import { createstore } from '../redux-store'
import getexpenses from '../redux-store/user-exprenses'

const goBack = (props) => {
  // console.log('Go Back was pressed!')
  props.navigation.dispatch(NavigationActions.back())
}

const addExpense = (props) => {
  props.navigation.navigate('EditExpensesPage')
}
const renderExpenses = (arr) => {
  if (!arr) return null
  return arr.map((expense) => {
    console.log('expense1337:', expense)
    return (
      <Expense km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} car_type={expense.car_type} key={expense._id} /> // Look out for issues with unique key
    )
  })
}

export default class ListExpenseScreen extends Component {
  constructor(props) {
    super(props)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
  }

  componentWillUnmount() {
    this.unsubscribe()
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

  render() {
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { goBack(this.props) }} leftadd={true} onAddPress={() => { addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
              Mina utgifter
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { renderExpenses(this.state.userExpenses.monthFormattedExpenses[this.props.navigation.state.params.monthIndex]) }
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
