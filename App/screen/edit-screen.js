import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import ExpenseForm from '../components/expense-form'
import { createstore, addexpenses, getexpenses } from '../redux-store' 
import AddExpenseButton from '../components/login-button'

// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}
const expenseProp = {
  date: null,
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
      route: this.onRouteChange,
      date: this.onDateChange
    }
    return functions[type]
  }
  
  
  /** componentDidUpdate () {
    console.log('edit-screen did update!')
  }*/

  onPressSend = () => {
    console.log('STATE in addExpense-screen:', this.state)
    createstore.dispatch(addexpenses(this.state.userExpenses._id, expenseProp))
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




  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={() => { this.goBack(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        <ExpenseForm onChange={this.onChange}  expenseProp={expenseProp} />
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
