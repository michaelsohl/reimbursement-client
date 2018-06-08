import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS
} from 'react-native'

import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import ExpenseForm from '../components/expense-form'
import { createstore, addexpenses, getexpenses } from '../redux-store' 
import AddExpenseButton from '../components/login-button'
import moment from 'moment'


// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}
const expenseProp = {
  date: moment().format(),
  car_type: '',
  km: '',
  route_descr: '',
  attest: false,
  client: ''
}

export default class EditScreen extends Component {

  constructor(props) {
    super(props)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
    this.onChange = this.onChange.bind(this) 
  }

  componentWillUnmount() {
    this.unsubscribe()
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

  onDatePress (date) {
    // console.log('date:', date)
    createstore.dispatch({
      type: 'OPEN_DATE_MODAL'
    })
  }

  hideDate (date) {
    // console.log('date:', date)
    createstore.dispatch({
      type: 'CLOSE_DATE_MODAL'
    })
  }
  
  onPress = (type) => {
    let functions = {
      date: this.onDatePress
    }
    return functions[type]
  }
  
  /** componentDidUpdate () {
    console.log('edit-screen did update!')
  }*/

  onPressSend = () => {
    console.log('payload:', expenseProp)
    createstore.dispatch(addexpenses(this.state.userExpenses._id, expenseProp))
    this.clearAllExpenses()
    this.goBack(this.props)
  }

  goBack = (props) => {
    props.navigation.dispatch(NavigationActions.back())
  }

  onKmChange = (data) => {
    createstore.dispatch({
      type: 'ADD_NEW_EXPENSE_KM',
      data
    })
    expenseProp.km = data
  }

  onClientChange = (data) => {
    // console.log('onClientChange!')
    createstore.dispatch({
      type: 'ADD_NEW_EXPENSE_CLIENT',
      data
    })
    expenseProp.client = data
  }

  onRouteChange = (data) => {
    createstore.dispatch({
      type: 'ADD_NEW_EXPENSE_ROUTEDESCR',
      data
    })
    expenseProp.route_descr = data
  }

  onDateChange = (data) => {
    createstore.dispatch({
      type: 'ADD_NEW_EXPENSE_DATE',
      data
    })
    expenseProp.date = data
  }

  onCarChange = (data) => {
    createstore.dispatch({
      type: 'ADD_NEW_EXPENSE_CARTYPE',
      data
    })
    expenseProp.car_type = data
  }

  clearAllExpenses = () => {
    createstore.dispatch({
      type: 'CLEAR_ALL_EXPENSES'
    })
  }




  render () {
    // console.log('expenseProp666:', this.state)
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        <ExpenseForm _toggleModal={this.hideDate} onChange={this.onChange}  expenseProp={expenseProp} onPress={this.onPress} modelOpen={this.state.userExpenses.date_modal_opened} />
        <AddExpenseButton onPress={ this.onPressSend } buttonName='Skicka in' />
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
