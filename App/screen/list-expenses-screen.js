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
      this.userid = config.testUserId ? config.testUserId : null
      getExpenses(this.userid)
      expensesUpdate()
    }
  }

  editExpense = (expenseIndex, userId, expenseId, comment) => {
    const { toggleSetToEditExpense, monthIndex } = this.props
    toggleSetToEditExpense(userId, expenseIndex, monthIndex, expenseId, comment)
    this.props.navigation.navigate('EditExpensesPage')
    // Expense should be give someting to tell it that edit is going down
  }

  onExpensePress = (expenseIndex, admin, expenseId, expenseUserId, comment) => {
    const { setExpenseAttest, postToServer, monthIndex, userId } = this.props
    if (admin && (userId != expenseUserId)) {
      setExpenseAttest(expenseIndex, monthIndex)
      postToServer(userId, expenseId)
    } else {
      this.editExpense(expenseIndex, userId, expenseId, comment)
    }
  }

  onExpenseLongPress = (expenseIndex, admin, expenseId, expenseUserId) => {
    const { toggleReportModal, setReport, openReportModal } = this.props
    if (admin) {
      setReport(expenseUserId, expenseId)
      openReportModal()
      toggleReportModal(expenseUserId, expenseId)
    }
  }

  goBack = (props) => {
    props.navigation.dispatch(NavigationActions.back())
  }
  
  addExpense = (props) => {
    props.navigation.navigate('EditExpensesPage')
  }
  renderExpenses = (arr, admin) => {
    const { isExpenseNew, carTypes, expenseId, userId } = this.props
    if (!arr) return null
    return arr.map((expense) => {
      return (
        <Expense userId={userId} expenseUserId={expense.userId} comment={ expense.comment } name={expense.name} admin={admin} onPress={() => { this.onExpensePress(arr.indexOf(expense), admin, expense._id, expense.userId, expense.comment) }} onLongPress={() => { this.onExpenseLongPress(arr.indexOf(expense), admin, expense._id, expense.userId)}} km={expense.km} date={expense.date} attest={expense.attest} descr={expense.route_descr} client={expense.client} carType={expense.car_type} carTypes={carTypes} key={expense._id} />
      )
    })
  }

  postComment = () => {
    const { updateComment, expenseUserId, expenseId, comment, getExpenses, userId, closeReportModal} = this.props
    updateComment(expenseUserId, expenseId, comment)
    setInterval(() => {}, 200)
    getExpenses(userId)
    closeReportModal()
  }

  render() {
    const { monthFormattedExpenses, admin, monthIndex, showReportModal, comment, onCommentChange } = this.props
    let month
    if (monthFormattedExpenses[monthIndex]) {
      month = (new Date(monthFormattedExpenses[monthIndex][0].date)).getMonth()
    }
    return (
      <View style={styles.container}>
        <Header buttonName='Tillbaka' onPress={() => { this.goBack(this.props) }} leftadd={true} onAddPress={() => { this.addExpense(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
              { month ? Months[month + 1] : null }
          </Text>
        </View>
        <View style={{flex: 1,width:'100%'}} >
          <ScrollView contentContainerStyle={{paddingBottom: 100, paddingLeft:20}}>
            { this.renderExpenses(monthFormattedExpenses[monthIndex], admin) }
          </ScrollView>
          </View>
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
      )
    }
  }

  const mapStateToProps = (state) => {
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
    toggleSetToEditExpense: (userId, expenseIndex, monthIndex, expenseId, comment) => { 
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
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
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
