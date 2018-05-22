import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Expense from '../components/expense'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'

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
    return (
      <Expense date={expense.date} attest={expense.attest} descr={expense.route_descr} key={expense._id} /> // Look out for issues with unique key
    )
  })
}

export default function (props) {
  console.log('expenses', props.navigation.state.params.expenses)
  return (
    <View style={styles.container}>
      <Header buttonName='Cancel' onPress={() => { goBack(props) }} leftadd={true} onAddPress={() => { addExpense(props) }} />
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>
            Mina utgifter
        </Text>
      </View>
      <View style={styles.expensesContainer} >
        <ScrollView>
          { renderExpenses(props.navigation.state.params.expenses) }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
