import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import ExpenseForm from '../components/expense-form'
import addexpenses from '../redux-store/add-expenses'
import updateexpense from '../redux-store/update-expense'
import removeexpense from '../redux-store/remove-expense'
import AddExpenseButton from '../components/login-button'
import moment from 'moment'
import Selectable from '../components/select-component'
import config from '../config'
import { connect } from 'react-redux'

// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}

class EditScreen extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this) 
  }

  componentWillUnmount() {
    // clear expensesAdded screen
  }

  componentDidMount () {
    const { chosenCarType, attachName, attachUserId, expenseProps, id, carChange, editExpense, expenses, kmChange, clientChange, routeChange, dateChange, e } = this.props

    if (editExpense.setToEdit) {
      let expense = expenses[editExpense.monthIndex][editExpense.expenseIndex]
      console.log('EXPENSE HEJHEJEHEJEHEJ:', expense)
      kmChange(`${expense.km}`)
      clientChange(expense.client)
      routeChange(expense.route_descr)
      dateChange(expense.date.slice(0, 10))
      carChange(expense.car_type) 
      attachName(e.name)
      attachUserId(e._id)
    } else {
      attachName(expenseProps.name)
      attachUserId(expenseProps.id)
    }

    this.userid = config.testUserId ? config.testUserId : id
  }

  onChange (type) {
    let functions = {
      km: this.onKmChange,
      client: this.onClientChange, 
      route_descr: this.onRouteChange,
      date: this.onDateChange,
      car_type: this.onCarChange
    }
    return functions[type]
  }

  onPress = (type) => {
    const { onDatePress } = this.props
    let functions = {
      date: onDatePress
    }
    return functions[type]
  }

  // onPressSend2 = () => {
  //   const { updateExpense, editExpense, expenseProps } = this.props
  //  updateExpense(editExpense.userId, editExpense.expenseId, expenseProps)
  // }

  onPress2 = () => {
    console.log('ON PRESS 2 RUNS')
    const { removeExpense, editExpense, clearExpenses } = this.props
    removeExpense(editExpense.userId, editExpense.expenseId)

    setTimeout(() => {}, 100)
    clearExpenses()
    setTimeout(() => {this.goBack()}, 100)
  }

  onPressSend = () => {
    const { addExpenses, clearExpenses, expenseProps, editExpense, updateExpense } = this.props
    
    if(editExpense.setToEdit) {
      console.log('HIT KOM VI 131337:', editExpense)
      console.log('expenseProps:', expenseProps)
      updateExpense(editExpense.userId, editExpense.expenseId, expenseProps)
      // updateExpense(this.userid, expenseProps)
    } else {
      addExpenses(this.userid, expenseProps)
    }
    setTimeout(() => {}, 100)
    clearExpenses()
    setTimeout(() => {this.goBack()}, 100)
  }

  goBack = () => {
    const { toggleSetToEditExpense, editExpense, navigation } = this.props
    console.log('this is correct right? :',)
    if (editExpense.setToEdit) {
      toggleSetToEditExpense()
    }
    navigation.dispatch(NavigationActions.back())
  }

  onKmChange = (data) => {
    const { kmChange } = this.props
    kmChange(data)
  }

  onClientChange = (data) => {
    const { clientChange } = this.props
    clientChange(data) 
  }

  onRouteChange = (data) => {
    const { routeChange } = this.props
    routeChange(data)
  }

  onDateChange = (data) => {
    const { dateChange } = this.props
    dateChange(data.dateString)
  }

  onCarChange = (arr, index) => {
    let data = arr[index]
    const { carChange, onCarPress } = this.props
    carChange(data)
    onCarPress()
  }

  renderSelectables = (arr, carTypeChosen) => {
    console.log('1:', arr)
    if (!arr) return null
    console.log(2)
    return arr.map((carTypeName) => {
      let attest = false
      console.log(3)
      if (carTypeName.match(carTypeChosen)) {
        attest = true
      }
      return (
        <Selectable onPress={() => { this.onCarChange(arr, arr.indexOf(carTypeName)) }} descr={carTypeName} attest={attest} key={carTypeName} /> // Look out for issues with unique key
      )
    })
  }


  render () {
    const { hideDate, carTypes, carType, dateModalOpened, carSelectOpened, onCarPress, expenseProps, editExpense } = this.props
    console.log('carTypes:', carTypes)
    console.log('carType:', carType)
    return (
      <TouchableWithoutFeedback 
      onPress={() => {  
        console.log('hejsan keybord dismiss #########################################') 
        Keyboard.dismiss()} }
      onPressOut={() => { console.log('hejsan keybord dismiss 22222 #########################################')  } } >
      <View style={styles.container}>
        <Header lefttrash={ editExpense.setToEdit ? true : false} onPress2={this.onPress2} buttonName='Avbryt' onPress={this.goBack } />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        <ScrollView>
          <ExpenseForm carTypes={carTypes} renderSelectables={this.renderSelectables} onCarPress={onCarPress} _toggleModal={hideDate} onChange={this.onChange}  expenseProps={expenseProps} onPress={this.onPress} modelOpen={dateModalOpened} carSelectOpen={carSelectOpened} />
        </ScrollView>
        <AddExpenseButton onPress={ this.onPressSend } buttonName={ editExpense.setToEdit ? 'Uppdatera' : 'Skicka in'} />
      </View>
      </ TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    e: state.userExpenses,
    carTypes: state.userExpenses.carTypes,
    dateModalOpened: state.userExpenses.dateModalOpened,
    carSelectOpened: state.userExpenses.carSelectOpened,
    editExpense: state.addExpenses.editExpense,
    expenses: state.userExpenses.monthFormattedExpenses,
    expenseProps: {
      date: state.addExpenses.addedExpense.date,
      attest: state.addExpenses.addedExpense.attest,
      carType: state.addExpenses.addedExpense.carType,
      km: state.addExpenses.addedExpense.km,
      route_descr: state.addExpenses.addedExpense.route_descr,
      client: state.addExpenses.addedExpense.client,
      userId: state.userExpenses._id,
      name: state.userExpenses.name
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDatePress: () => { dispatch({ type: 'OPEN_DATE_MODAL' }) },
    hideDate: () => { dispatch({ type: 'CLOSE_DATE_MODAL' }) },
    addExpenses: (userId, expenseProp) => { dispatch(addexpenses(expenseProp)) },
    updateExpense: (userId, expenseId, expenseProps) => { dispatch(updateexpense({ userId, expenseId, expenseProps} )) }, 
    removeExpense: (userId, expenseId) => { dispatch(removeexpense({ userId, expenseId })) },
    clearExpenses: () => { dispatch({ type: 'CLEAR_ALL_EXPENSES' }) },
    toggleSetToEditExpense: () => { 
      dispatch({
        type: 'TOGGLE_SET_TO_EDIT_EXPENSE'
    })},
    kmChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_KM',
      data })  
    },
    clientChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_CLIENT',
      data })
    },
    routeChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_ROUTEDESCR',
      data
      })
    },
    dateChange: (data, userId) => { dispatch({
      type: 'ADD_NEW_EXPENSE_DATE',
      data
      }) // userId had to be added somewhere. This location was arbitarily chosen.
    },
    carChange: (data) => {
      dispatch({
        type: 'ADD_NEW_EXPENSE_CARTYPE',
        data
      })
    },
    onCarPress: () => {
      dispatch({
        type: 'OPEN_CAR_SELECT',
      })
    },
    attachName: (data) => {
      type: 'ATTACH_NAME_TO_EXPENSE',
      data
    },
    attachUserId: (data) => {
      type: 'ATTACH_USERID_TO_EXPENSE',
      data
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen)

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textContainer: {
    height: 80,
    alignItems: 'center',
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
