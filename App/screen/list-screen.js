import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Header from '../components/header'
import { createstore } from '../redux-store'
import getexpenses from '../redux-store/user-exprenses'
import Expense from '../components/expense'
// import Header from './components/header'
// import store from './redux-store'


export default class ListScreen extends Component {
  constructor(props){
    super(props)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
  }
  componentDidMount() {
    console.log('componentDidMount')
    createstore.dispatch(getexpenses('michael.sohl@sylog.se'))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  signout = () => {
    this.props.navigation.navigate('Start')
  }


  renderExpenses = (arr) => {
    if(!arr) return null
    return arr.map((expense) => { 
      return (
        <Expense date={expense.date} attest={expense.attest} descr={expense.route_descr} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  render () {
    console.log('HERE IS LIST_SCREEN STATE:', this.state)
    return (
      <View style={styles.container}>
        <Header buttonName='Sign out' onPress={this.signout} />
        <View style={styles.textContainer}>
        <Text style={styles.welcome}>
              Mina utgifter
        </Text>
        </View>
          <View style={styles.expensesContainer} >
          <ScrollView>
            { this.renderExpenses(this.state.userExpenses.expenses) }
          </ScrollView>
          </View>
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
