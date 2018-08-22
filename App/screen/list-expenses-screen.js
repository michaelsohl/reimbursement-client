import React, { Component }from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import Expense from '../components/expense'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import getexpenses from '../redux-store/user-exprenses'
import config from '../config'
import postattest from '../redux-store/attest'
import { connect } from 'react-redux'
import updatecomment from '../redux-store/update-comment'
import { Months } from '../lib/dates'
import Modal from 'react-native-modal'
import CommentTextField from '../components/comment-text-field'

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

  onExpenseLongPress = (expenseIndex, admin, expenseId, expenseUserId) => {
    console.log('onExpenseLongPress')
    const { toggleReportModal, setReport, openReportModal } = this.props
    if (admin) {
      console.log('expenseID:', expenseId, expenseUserId)
      setReport(expenseUserId, expenseId)
      openReportModal()
      toggleReportModal(expenseUserId, expenseId)
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
    const { isExpenseNew, carTypes, comment, expenseId } = this.props
    console.log('this.state:', this.state)
    if (!arr) return null
    return arr.map((expense) => {
      console.log('expense1337:', expense)
      return (
        <Expense comment={ expense.comment } name={expense.name} admin={admin} onPress={() => { this.onExpensePress(arr.indexOf(expense), admin, expense._id, expense.userId) }} onLongPress={() => { this.onExpenseLongPress(arr.indexOf(expense), admin, expense._id, expense.userId)}} km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} carType={expense.car_type} carTypes={carTypes} key={expense._id} /> // Look out for issues with unique key
      )
    })
  }

  postComment = () => {
    const { updateComment, expenseUserId, expenseId, comment, getExpenses, userId, closeReportModal} = this.props
    updateComment(expenseUserId, expenseId, comment)
    console.log('userId:', this.userid, expenseUserId, userId)
    getExpenses(userId)
    closeReportModal()
  }

  render() {
    const { monthFormattedExpenses, admin, monthIndex, showReportModal, comment, onCommentChange } = this.props
    let month
    if (monthFormattedExpenses[monthIndex]) {
      month = (new Date(monthFormattedExpenses[monthIndex][0].date)).getMonth()
    }
    console.log('showReportModal:', showReportModal)
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
          <Modal isVisible={showReportModal}> 
            <View style={{justifyContent: 'center', alignItems:'center'}}>
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}> Kommentera utlägg </Text>
             </View>
              <CommentTextField comment={comment} onChangeText={onCommentChange} />
              <TouchableOpacity style={{height: 40, width: 100, backgroundColor: 'white', borderRadius: 10, margin: 20}} onPress={() => { this.postComment() }} >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text> Lägg till </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log('state:', state)
    return {
      expenseUserId: state.addExpenses.editExpense.userId,
      expenseId: state.addExpenses.editExpense.expenseId,
      comment: state.addExpenses.editExpense.comment,
      userId: state.userExpenses._id,
      expenseJustAdded: state.userExpenses.expenseJustAdded,
      monthFormattedExpenses: state.userExpenses.monthFormattedExpenses,
      admin: state.userExpenses.admin,
      name: state.userExpenses.name,
      monthIndex: state.userExpenses.monthIndex,
      carType: state.userExpenses.carType,
      carTypes: state.userExpenses.carTypes,
      showReportModal: state.addExpenses.editExpense.showReportModal
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
      },
    toggleReportModal: (userId, expenseId) => { dispatch({ type: 'TOGGLE_REPORT_MODAL', data: {userId, expenseId}}) },
    openReportModal: () => { dispatch({type: 'OPEN_REPORT_MODAL'}) },
    closeReportModal: () => { dispatch({type: 'CLOSE_REPORT_MODAL'}) },
    setReport: (userId, expenseId) => { dispatch({type:'SET_REPORT', data: {userId, expenseId}})},
    onCommentChange: (data) => { dispatch({
      type: 'ON_CHANGE_COMMENT', 
      data
    })},
    updateComment: (userId, expenseId, comment) => { dispatch(updatecomment({userId, expenseId, comment})) } 
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
