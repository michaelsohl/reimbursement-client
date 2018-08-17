import React, { Component }from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Expense from '../components/expense'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import getexpenses from '../redux-store/user-exprenses'
import config from '../config'
import postattest from '../redux-store/attest'
import { connect } from 'react-redux'
import { Months } from '../lib/dates'

class ListExpenseScreen extends Component {

  componentDidUpdate () {
    const { expenseJustAdded, getExpenses, expensesUpdate } = this.props
    if(expenseJustAdded) {
      console.log('this particular state:', this.state)
      this.userid = config.testUserId ? config.testUserId : null
      getExpenses(this.userid)
      expensesUpdate()
    }
  }

  editExpense = (expenseIndex, userId, expenseId) => {
    console.log('editExpense')
    const { toggleSetToEditExpense, monthIndex } = this.props
    toggleSetToEditExpense(userId, expenseIndex, monthIndex, expenseId)
    this.props.navigation.navigate('EditExpensesPage')
    // Expense should be give someting to tell it that edit is going down
  }

  onExpensePress = (expenseIndex, admin, expenseId, expenseUserId) => {
    const { setExpenseAttest, postToServer, monthIndex, userId } = this.props
    console.log('setExpenseAttest:', setExpenseAttest)
    if (admin && (userId != expenseUserId)) {
      setExpenseAttest(expenseIndex, monthIndex)
      console.log('expenseID:', expenseId)
      postToServer(userId, expenseId)
    } else {
      this.editExpense(expenseIndex, userId, expenseId)
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
    const { isExpenseNew, carTypes } = this.props
    console.log('this.state:', this.state)
    if (!arr) return null
    return arr.map((expense) => {
      console.log('expense1337:', expense)
      return (
        <Expense name={expense.name} admin={admin} onPress={() => { this.onExpensePress(arr.indexOf(expense), admin, expense._id, expense.userId) }} km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} carType={expense.car_type} carTypes={carTypes} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  render() {
    const { monthFormattedExpenses, admin, monthIndex } = this.props
    let month
    if (monthFormattedExpenses[monthIndex]) {
      month = (new Date(monthFormattedExpenses[monthIndex][0].date)).getMonth()
    }
    // console.log('monthFormattedExpenses[monthIndex][0]):', monthFormattedExpenses[monthIndex][0])
    return (
      <View style={styles.container}>
        <Header buttonName='Tillbaka' onPress={() => { this.goBack(this.props) }} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
              { month ? Months[month + 1] : null }
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { this.renderExpenses(monthFormattedExpenses[monthIndex], admin) }
          </ScrollView>
        </View>
      </View>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log('state:', state)
    return {
      userId: state.userExpenses._id,
      expenseJustAdded: state.userExpenses.expenseJustAdded,
      monthFormattedExpenses: state.userExpenses.monthFormattedExpenses,
      admin: state.userExpenses.admin,
      name: state.userExpenses.name,
      monthIndex: state.userExpenses.monthIndex,
      carType: state.userExpenses.carType,
      carTypes: state.userExpenses.carTypes
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getExpenses : (userId) => { dispatch(getexpenses(userId)) },
      expensesUpdate : () => { 
        dispatch({
          type: 'TURN_OFF_UPDATE_FLAG'
        })
      },
      setExpenseAttest: (expenseIndex, monthIndex) => {
        dispatch({
          type: 'TOGGLE_ATTEST',
          data: {
            monthIndex,
            expenseIndex
          }
      })
    },
    postToServer: (userId, expenseId) => { dispatch(postattest(userId, expenseId)) },
    toggleSetToEditExpense: (userId, expenseIndex, monthIndex, expenseId) => { 
      dispatch({
        type: 'TOGGLE_SET_TO_EDIT_EXPENSE', 
        data: { userId, expenseIndex, monthIndex, expenseId }} )
      }
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ListExpenseScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textContainer: {
    height: 50,
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
