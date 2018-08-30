import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Divider,
  Animated,
  TouchableOpacity
} from 'react-native'
import Header from '../components/header'
import getexpenses from '../redux-store/user-exprenses'
import Expense from '../components/expense'
import Month from '../components/month'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import config from '../config'
import { connect } from 'react-redux'
import createpdf from '../redux-store/create-pdf'
import { SylogHeader } from '../media'
import Modal from 'react-native-modal'
import moment from 'moment'


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

  onMonthLongPress = (months, index) => {
    const { setPdfDate, openPdfModal } = this.props
    console.log(months, ' ', index)
    let firstExpense = months[index][0]
    setPdfDate(firstExpense.date)
    openPdfModal()
  }

  closeModal = () => {
    const { closePdfModal } = this.props
    closePdfModal()
  }

  createPdf = () => {
    // skicka ett anrop till servern som skapar och skickar en pdf till admin skicka med månad som ska skrivas ut.
    // 
    const { createPdf, pdfDate } = this.props
    console.log(1)
    createPdf(pdfDate)
  }

  renderMonths = (arr) => {
    if(!arr) return null
    return arr.map((month) => { 
      let m = new Date(month[0].date)
      return (
        <Month onPress={() => { this.onMonthPress(arr, arr.indexOf(month)) }} year={m.getFullYear()} month={m.getMonth()} attest={month[0].attest} descr={month[0].route_descr} key={month[0]._id} onLongPress={ () => this.onMonthLongPress(arr, arr.indexOf(month)) } />   
      )
    })
  }
/**
 * { this.state.userExpenses.monthIndex === arr.indexOf(month) ? this.renderExpenses(month) : null }
 */


  render () {
    const { monthFormattedExpenses, admin, name, pdfModalOpen } = this.props
    return (
      <View style={styles.container}>
        <Header buttonName='Logga ut' onPress={this.signout} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            { admin ? 'Reseutlägg' : `${name}s reseutlägg`  }
          </Text>
        </View>
          <ScrollView style={{width:'100%', right: 10, left: 10}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
            { monthFormattedExpenses.length == 0 ? <Text> Inga reseutlägg </Text> : null }
            { this.renderMonths(monthFormattedExpenses) }
            </View>
          </ScrollView>
          <Modal isVisible={pdfModalOpen}>
            <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{ position: 'absolute', bottom: 0}}>
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor: 'white', borderRadius: 10, margin: 20}} onPress={this.createPdf} >
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={styles.buttonText}> Skapa pdf </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor: 'white', borderRadius: 10, margin: 20}} onPress={this.closeModal } >
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={styles.buttonText}> Stäng fönster </Text>
               </View>
            </TouchableOpacity>
            </View>
          </View>
          </Modal>
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
  name: state.userExpenses.name,
  pdfModalOpen: state.pdf.modalOn,
  pdfDate: state.pdf.date
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
    },
    openPdfModal: () => {
      dispatch({
        type: 'OPEN_PDF_MODAL'
      })
    },
    closePdfModal: () => {
      dispatch({
        type: 'CLOSE_PDF_MODAL'
      })
    },
    setPdfDate: (date) => {
      dispatch({
        type: 'SET_PDF_DATE',
        date
      })
    },
    createPdf: (date) => {
      dispatch(createpdf(date))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListScreen)

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  textContainer: {
    height: 50,
    alignItems: 'center',
  },
  expensesContainer: { 
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  welcome: {
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Helvetica',
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
