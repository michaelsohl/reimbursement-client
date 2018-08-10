import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Divider,
  Animated
} from 'react-native'
import Header from '../components/header'
import getexpenses from '../redux-store/user-exprenses'
import Expense from '../components/expense'
import Month from '../components/month'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import config from '../config'
import { connect } from 'react-redux'

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class ListScreen extends Component {
  constructor(props){
    super(props)
    // this.state = createstore.getState()
    // this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
  }
  componentDidMount() {
    const { getExpenses } = this.props
    if(this.props.navigation) {
      this.userid = config.testUserId ? config.testUserId : this.props.navigation.state.params.userId
      // createstore.dispatch(getexpenses(this.userid))
      getExpenses(this.userid)
    }
  }

  signout = () => {
    this.props.navigation.navigate('Start')
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
    const { getExpenses, expenseJustAdded, expensesUpdate } = this.props
    if(expenseJustAdded) {
      // createstore.dispatch(getexpenses(this.userid))
      getExpenses(this.userid)
      expensesUpdate()
    }
  }

  addExpense = (props) => {
    props.navigation.navigate('EditExpensesPage', { replace: true })
  }

  onMonthPress = (arr, index) => {
    const { setMonthScreen } = this.props
    setMonthScreen(index)
    this.props.navigation.navigate('ExpensesList', {replace: true })
  }

  renderMonths = (arr) => {
    if(!arr) return null
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
    const { monthFormattedExpenses, admin, name } = this.props
    return (
      <View style={styles.container}>
        <Header buttonName='Logga ut' onPress={this.signout} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            { admin ? 'Reseutlägg' : `${name}s reseutlägg`  }
          </Text>
        </View>
        <View style={styles.expensesContainer} >
          <ScrollView>
            { monthFormattedExpenses.length == 0 ? <Text> Inga reseutlägg </Text> : null }
            { this.renderMonths(monthFormattedExpenses) }
          </ScrollView>
        </View>
      </View>
    )
  }
}

/**
 * <Animated.View style={styles.header}>
            <View style={styles.bar}>
              <Text style={styles.title}>Title</Text>
            </View>
          </Animated.View>
 */

const mapStateToProps = (state) => {
 return {
  monthFormattedExpenses: state.userExpenses.monthFormattedExpenses,
  expenseJustAdded: state.userExpenses.expenseJustAdded,
  admin: state.userExpenses.admin,
  name: state.userExpenses.name
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenses: (userId) => {
      dispatch(getexpenses(userId))
    },
    expensesUpdate: () => {
      dispatch({
        type: 'TURN_OFF_UPDATE_FLAG'
      })
    },
    setMonthScreen: (index) => {
      dispatch({
        type: 'SET_MONTH_SCREEN',
        index
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListScreen)

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  }
})
