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
    const { expenseJustAdded, getExpenses, expensesUpdated } = this.props
    if(expenseJustAdded) {
      console.log('this particular state:', this.state)
      this.userid = config.testUserId ? config.testUserId : null
      getExpenses(this.userid)
      expensesUpdated()
    }
  }

  editExpense = () => {
    console.log('editExpense')
  }

  onExpensePress = (expenseIndex, admin, expenseId, userId) => {
    const { setExpenseAttest, postToServer } = this.props
    console.log('setExpenseAttest:', setExpenseAttest)
    if (admin) {
      setExpenseAttest(expenseIndex, this.props.navigation.state.params.monthIndex)
      postToServer(userId, expenseId)
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
    console.log('this.state:', this.state)
    if (!arr) return null
    return arr.map((expense) => {
      console.log('expense1337:', expense)
      return (
        <Expense name={expense.name} admin={admin} onPress={() => { this.onExpensePress(arr.indexOf(expense), admin, expense._id, expense.userId) }} km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} car_type={expense.car_type} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  render() {
    const { monthFormattedExpenses, admin, monthIndex } = this.props
    let month = (new Date(monthFormattedExpenses[monthIndex][0].date)).getMonth()
    // console.log('monthFormattedExpenses[monthIndex][0]):', monthFormattedExpenses[monthIndex][0])
    return (
      <View style={styles.container}>
        <Header buttonName='Tillbaka' onPress={() => { this.goBack(this.props) }} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
              { Months[month + 1] }
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { this.renderExpenses(monthFormattedExpenses[this.props.navigation.state.params.monthIndex], admin) }
          </ScrollView>
        </View>
      </View>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log('state:', state)
    return {
      expenseJustAdded: state.userExpenses.expenseJustAdded,
      monthFormattedExpenses: state.userExpenses.monthFormattedExpenses,
      admin: state.userExpenses.admin,
      name: state.userExpenses.name,
      monthIndex: state.userExpenses.monthIndex
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
    postToServer: (userId, expenseId) => { dispatch(postattest(userId, expenseId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpenseScreen)


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
