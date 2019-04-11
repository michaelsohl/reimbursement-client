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
import addfavorite from '../redux-store/add-favorite'
import getfavorites from '../redux-store/get-favorites'
import getexpenses from '../redux-store/user-exprenses'
import removefavorite from '../redux-store/remove-favorite'
import updatecomment from '../redux-store/update-comment'
import AddExpenseButton from '../components/login-button'
import moment from 'moment'
import Selectable from '../components/select-component'
import config from '../config'
import { connect } from 'react-redux'
import StdTextInput from '../components/std-text-input'
import FavoriteButton from '../components/favorite-button'
import { sylogRed, backgroundColor } from '../themes'

// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}

class EditScreen extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this) 
  }

  componentWillUnmount() {
    const { onFavoritePress } = this.props
    onFavoritePress(-1)
  }

  componentDidMount () {
    const { chosenCarType, attachName, attachUserId, expenseProps, id, carChange, editExpense, expenses, kmChange, clientChange, routeChange, dateChange, e, getFavorites, onCommentChange } = this.props
    if (editExpense.setToEdit) {
      let expense = expenses[editExpense.monthIndex][editExpense.expenseIndex]
      getFavorites(e._id)
      kmChange(`${expense.km}`)
      clientChange(expense.client)
      routeChange(expense.route_descr)
      dateChange(expense.date.slice(0, 10))
      carChange(expense.car_type) 
      attachName(e.name)
      attachUserId(e._id)
      onCommentChange(expense.comment)

    } else {
      getFavorites(e._id)
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
      car_type: this.onCarChange,
      nick: this.onNickChange
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
    const { removeExpense, editExpense, clearExpenses, navigation } = this.props
    removeExpense(editExpense.userId, editExpense.expenseId)
    setTimeout(() => {}, 100)
    clearExpenses()
    setTimeout(() => {navigation.navigate('ListPage'), {replace: true}}, 100)
  }

  onPressSend = () => {
    const { addExpenses, clearExpenses, expenseProps, editExpense, updateExpense, favoriteMode, addFavorite, e, favoriteProps, onStarPress, getFavorites, updateComment } = this.props
    if (favoriteMode) {
      addFavorite(e._id, favoriteProps)
      onStarPress()
      setTimeout(() => { getFavorites(e._id)}, 100)
    } else {
      if(editExpense.setToEdit) {
        updateExpense(editExpense.userId, editExpense.expenseId, expenseProps)
        updateComment(editExpense.userId, editExpense.expenseId, '')

      // updateExpense(this.userid, expenseProps)
      } else {
        addExpenses(this.userid, expenseProps)
      }
      setTimeout(() => {}, 100)
      clearExpenses()
      setTimeout(() => {this.goBack()}, 100)
    }
  }

  goBack = () => {
    const { toggleSetToEditExpense, editExpense, navigation } = this.props
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

  onNickChange = (data) => {
    const { nickChange } = this.props
    nickChange(data)
  }

  onFavoritePress = (arr, index) => {
    // const { }
    const { onFavoritePress } = this.props
    let favorite = arr[index]
    onFavoritePress(index)
    this.onKmChange((favorite.km).toString())
    this.onClientChange(favorite.client)
    this.onRouteChange(favorite.route_descr)
    this.onNickChange(favorite.nick)
  }

  removeFavorite = () => {
    const { getFavorites, removeFavorite, e, favorites, currentFavoriteIndex, clearExpenses, onFavoritePress } = this.props
    removeFavorite(e._id, favorites[currentFavoriteIndex]._id)
    setInterval(()=> {}, 200)
    getFavorites(e._id)
    clearExpenses()
    onFavoritePress(-1)
  }

  clear = () => {
    const { clearExpenses, onFavoritePress } = this.props
    console.log('clear')
    clearExpenses()
    onFavoritePress(-1)
  }

  renderSelectables = (arr, carTypeChosen) => {
    if (!arr) return null
    return arr.map((carTypeName) => {
      let attest = false
      if (carTypeName.match(carTypeChosen)) {
        attest = true
      }
      return (
        <Selectable onPress={() => { this.onCarChange(arr, arr.indexOf(carTypeName)) }} descr={carTypeName} attest={attest} key={carTypeName} /> // Look out for issues with unique key
      )
    })
  }

  renderFavorites = (arr) => {
    const { currentFavoriteIndex } = this.props 
    if (!arr) return null
    return arr.map((favorite) => {
      return (
        <FavoriteButton isButtonPressed={ currentFavoriteIndex == arr.indexOf(favorite) ? true : false } text={favorite.nick} key={favorite._id} onPress={ () => { this.onFavoritePress(arr, arr.indexOf(favorite))}} />
      )
    })
  }

  onStarPress = () => {
    const { clearExpenses, onStarPress} = this.props
    clearExpenses()
    onStarPress()
  }


  render () {
    const { hideDate, carTypes, carType, dateModalOpened, carSelectOpened, onCarPress, expenseProps, editExpense, favoriteMode, favoriteNick, favorites, currentFavoriteIndex, isFavoritePressed, removeFavorite } = this.props
    let addText
    if (favoriteMode) {
      addText = 'Lägg till favorit'
    } else {
      if (editExpense.setToEdit) {
        addText = 'Uppdatera'
      } else {
        addText = 'Skicka in'
      }
    }
    return (
      <TouchableWithoutFeedback 
      onPress={() => {
        Keyboard.dismiss()} }
      onPressOut={() => {  } } >
      <View style={styles.container}>
        <Header removeFavorite={this.removeFavorite} isFavoritePressed={isFavoritePressed} favoriteMode={favoriteMode} lefttrash={ editExpense.setToEdit ? true : false} rightstar={ editExpense.setToEdit ? false : true } onStarPress={this.onStarPress} onPress2={this.onPress2} buttonName='Avbryt' onPress={this.goBack } />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        { favorites.length == 0 ? 
        <Text onPress={this.onStarPress} color={'grey'} style={{fontSize: 12, fontWeight: '100' }}> Favoriter saknas </Text>: null }
        <ScrollView style={{width:'100%', right: 10, left: 10}}>
          <ScrollView style={{left: 20}} horizontal={true} contentContainerStyle={{paddingRight: 50}} >
            <View style={{flex: 1,flexDirection: 'row', alignItems:'center', backgroundColor:'white', width:'100%'}}>
              { this.renderFavorites(favorites) }
            </View>
          </ScrollView>
          <ExpenseForm comment={editExpense.comment} clear={this.clear} favoriteNick={favoriteNick} favoriteMode={favoriteMode} carTypes={carTypes} renderSelectables={this.renderSelectables} onCarPress={onCarPress} _toggleModal={hideDate} onChange={this.onChange}  expenseProps={expenseProps} onPress={this.onPress} modelOpen={dateModalOpened} carSelectOpen={carSelectOpened} />
        </ScrollView>
        <AddExpenseButton onPress={ this.onPressSend } buttonName={ addText } />
      </View>
      </ TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // comment: state
    isFavoritePressed: state.favorites.favoriteChosenIndex != -1 ? true : false,
    currentFavoriteIndex: state.favorites.favoriteChosenIndex,
    favorites: state.favorites.favorites,
    favoriteMode: state.favorites.favoriteMode, 
    favoriteNick: state.favorites.favoriteNick,
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
    },
    favoriteProps: {
      carType: state.addExpenses.addedExpense.carType,
      km: state.addExpenses.addedExpense.km,
      route_descr: state.addExpenses.addedExpense.route_descr,
      client: state.addExpenses.addedExpense.client,
      nick: state.favorites.favoriteNick
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDatePress: () => { dispatch({ type: 'OPEN_DATE_MODAL' }) },
    hideDate: () => { dispatch({ type: 'CLOSE_DATE_MODAL' }) },
    addExpenses: (userId, expenseProp) => { dispatch(addexpenses(expenseProp)) },
    getExpenses : (userId) => { dispatch(getexpenses(userId)) },
    getFavorites: (userId) => { dispatch(getfavorites(userId))},
    addFavorite: (userId, favoriteProps) => { dispatch(addfavorite(userId, favoriteProps))}, 
    updateExpense: (userId, expenseId, expenseProps) => { dispatch(updateexpense({ userId, expenseId, expenseProps} )) }, 
    onStarPress: () => { dispatch({type: 'ON_STAR_PRESS'}) },
    onFavoritePress: (data) => { 
      dispatch({
        type: 'ON_FAVORITE_PRESS',
        data }) 
    },
    updateComment: (userId, expenseId, comment) => { dispatch(updatecomment({userId, expenseId, comment})) },
    onCommentChange: (data) => { dispatch({
      type: 'ON_CHANGE_COMMENT', 
      data
    })},
    removeFavorite: (userId, favoriteId) => { dispatch(removefavorite({ userId, favoriteId })) },
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
    nickChange: (data) => {
      dispatch({
        type: 'ADD_NEW_FAVORITE_NICK',
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
    backgroundColor: 'white',
    width: '100%'
  },
  welcome: {
    fontSize: 25,
    fontFamily: 'Helvetica',
    fontWeight: '400',
    textAlign: 'center',
    margin: 10
  },
  textContainer: {
    height: 50,
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
