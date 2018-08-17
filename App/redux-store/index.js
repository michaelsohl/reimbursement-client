// import AppNavigator from '../navigation'
import AppNavigator from '../navigation/index'
import { logger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import EmailValidation from './email-validation'
import AddExpenses from './add-expenses'
import deepFreeze from 'deep-freeze'
import moment from 'moment'
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'

const navReducer = createNavigationReducer(AppNavigator)
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const userDefaultState = {
  _id: '',
  name: '',
  email: '',
  admin: false,
  expenses: [],
  formattedExpenses: [],
  monthFormattedExpenses: [],
  monthIndex: -1,
  expenseJustAdded: false,
  dateModalOpened: false,
  carSelectOpened: true,
  carType: []
}

const loginDefaultState = {
  value: '',
  password: '',
  loggedIn: false,
  feedback: '',
  data: false,
  userId: ''
}

const defaultExpense = {
  addedExpense: {
    attest: false,
    carType: 'Egen bil',
    date: moment().format().slice(0, 10),
    userId: '',
    name: '' },
  editExpense: {
    setToEdit: false,
    userId: '',
    expenseId: ''
  }
}

const defaultAttestExpense = {
  attests: []
}

const defaultCreateAccount = {
  email: '',
  pass: ''
}
const defaultFavorite = {
  favoriteMode: false,
  favorites: [],
  favoriteNick: '',
  favoriteChosenIndex: -1
}

const reducers = combineReducers({
  loginEmail: loginReducer,
  userExpenses: getUserReducer,
  addExpenses: addExpensesReducer,
  attests: attestExpenses,
  createAccount: createAccountReducer,
  favorites: favoriteReducer,
  nav: navReducer
})

// AUTH reducer
function loginReducer (state = loginDefaultState, action) {
  let newObj
  switch (action.type) {
    case 'LOGIN_EMAIL':
      newObj = {
        value: action.text,
        valid: true
      }
      return Object.assign({}, state, newObj)
    case 'GET_DATA':
      console.log('DATA MF!!!1337:', action.data)
      newObj = {
        data: action.data.validEmail,
        userId: action.data.userId
      }
      return Object.assign({}, state, newObj)
    case 'LOGIN_PASSWORD':
      newObj = {
        password: action.text
      }
      return Object.assign({}, state, newObj)
    case 'FEEDBACK':
      return Object.assign({}, state, { feedback: action.mess })
    default:
      return state
  }
}

// GETUserReducer
function getUserReducer (state = userDefaultState, action) {
  let newObj
  let monthFormattedExpenses = []
  switch (action.type) {
    case 'OPEN_CAR_SELECT':
      console.log('OPEN_CAR_SELECT:', state)
      newObj = {
        carSelectOpened: !state.carSelectOpened
      }
      return Object.assign({}, state, newObj)
    case 'TURN_OFF_UPDATE_FLAG':
      newObj = {
        expenseJustAdded: false
      }
      return Object.assign({}, state, newObj)
    case 'OPEN_DATE_MODAL':
      newObj = {
        dateModalOpened: true
      }
      return Object.assign({}, state, newObj)
    case 'POST_USER_EXPENSES':
      console.log('POST_USER_EXPENSES')
      newObj = {
        expenseJustAdded: true
      }
      return Object.assign({}, state, newObj)
      // return state
    case 'POST_UPDATE_EXPENSE':
      newObj = {
        expenseJustAdded: true
      }
      return Object.assign({}, state, newObj)
    case 'CLOSE_DATE_MODAL':
      newObj = {
        dateModalOpened: false
      }
      return Object.assign({}, state, newObj)
    case 'GET_USER_EXPENSES':
      console.log('GET_USER_EXPENSES')
      console.log('data:', action.data)
      let expensesList = action.data.expenses.slice(0, action.data.expenses.length)
      console.log('1')
      deepFreeze(action.data.expenses)
      if (expensesList.length == 0) {
        newObj = {
          _id: action.data._id,
          name: action.data.name,
          email: action.data.email,
          admin: action.data.admin,
          carTypes: action.data.car_types,
          monthFormattedExpenses: []
        }
        return Object.assign({}, state, newObj)
      }
      console.log('2')
      expensesList.sort(function (a, b) {
        let _a = moment(a.date)
        let _b = moment(b.date)
        return _b.valueOf() - _a.valueOf()
        // return new Date(b.date) - new Date(a.date)
      })
      console.log('3')

      let index = 0
      expensesList.forEach(elem => {
        if (monthFormattedExpenses.length == 0) {
          monthFormattedExpenses.push([elem])
        } else {
          let d1 = new Date(monthFormattedExpenses[index][0].date)
          let d2 = new Date(elem.date)
          if (d1.getMonth() === d2.getMonth()) {
            monthFormattedExpenses[index].push(elem)
          } else {
            monthFormattedExpenses.push([elem])
            index++
          }
        }
      })
      console.log('4')

      monthFormattedExpenses.forEach(elem => {
        elem.sort(function (a, b) {
          if (!b.attest && a.attest) {
            return 1
          } else if (b.attest && !a.attest) {
            return -1
          }
          return -1
        })
      })
      console.log('5')

      newObj = {
        _id: action.data._id,
        name: action.data.name,
        email: action.data.email,
        admin: action.data.admin,
        monthFormattedExpenses: monthFormattedExpenses,
        carType: action.data.car_type,
        carTypes: action.data.car_types
      }
      console.log('6')
      return Object.assign({}, state, newObj)
    case 'SETUP_FORMATTED_EXPENSES':
      const { expenses } = state
      newObj = {
        formattedExpenses: expenses
      }
      return Object.assign({}, state, newObj)
    case 'SET_MONTH_SCREEN':
      newObj = {
        monthIndex: action.index
      }
      return Object.assign({}, state, newObj)
    case 'TOGGLE_ATTEST':
      let copyExpenses = state.monthFormattedExpenses.slice(0, state.monthFormattedExpenses.length) // why do I do slice??
      let expense = copyExpenses[action.data.monthIndex][action.data.expenseIndex]
      let newExp = Object.assign({}, expense, { attest: !expense.attest })
      copyExpenses[action.data.monthIndex][action.data.expenseIndex] = newExp
    
      newObj = {
        monthFormattedExpenses: copyExpenses
      }
      console.log('expense:', newObj)
      // console.log('toggled ATTEST obj:', obj)
      return Object.assign({}, state, newObj)
    case 'REMOVE_EXPENSE':
      newObj = {
        expenseJustAdded: true
      }
      return Object.assign({}, state, newObj)
    default:
      return state
  }
}
// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}

function addExpensesReducer (state = defaultExpense, action) {
  let newObj
  let obj
  deepFreeze(state.addedExpense)
  switch (action.type) {
    case 'CLEAR_ALL_EXPENSES':
      return defaultExpense
    case 'ADD_NEW_EXPENSE_DATE':
      obj = Object.assign({}, state.addedExpense, { date: action.data, userId: action.id, name: action.name })
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_CARTYPE':
      console.log('ADD_NEW_EXPENSE_CARTYPE')
      obj = Object.assign({}, state.addedExpense, {carType: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_KM':
      obj = Object.assign({}, state.addedExpense, {km: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_ROUTEDESCR':
      obj = Object.assign({}, state.addedExpense, {route_descr: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_CLIENT':
      obj = Object.assign({}, state.addedExpense, {client: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ATTACH_NAME_TO_EXPENSE':
      obj = Object.assign({}, state.addedExpense, {name: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ATTACH_USERID_TO_EXPENSE':
      obj = Object.assign({}, state.addedExpense, {userId: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'TOGGLE_SET_TO_EDIT_EXPENSE':
      console.log('SET_TO_EDIT_EXPENSE')
      if (state.editExpense.setToEdit) {
        return defaultExpense
      }
      console.log('kom vidare!')
      
      obj = Object.assign({}, state.editExpense, { setToEdit: true, userId: action.data.userId, expenseIndex: action.data.expenseIndex, monthIndex: action.data.monthIndex, expenseId: action.data.expenseId })
      newObj = {
        editExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'POST_EXPENSE_UPDATE':
      return state
    default:
      return state
  }
}

function favoriteReducer (state = defaultFavorite, action) {
  let newObj
  switch (action.type) {
    case 'ON_STAR_PRESS':
      newObj = {
        favoriteMode: !state.favoriteMode
      }
      return Object.assign({}, state, newObj)
    case 'ON_FAVORITE_PRESS':
      newObj = {
        favoriteChosenIndex: action.data
      }
      return Object.assign({}, state, newObj)
    case 'GET_FAVORITES':
      newObj = {
        favorites: action.data.favorites
      }
      return Object.assign({}, state, newObj)
    case 'REMOVE_FAVORITE':
      return state
    case 'ADD_NEW_FAVORITE_NICK':
      newObj = {
        favoriteNick: action.data
      }
      return Object.assign({}, state, newObj)
    case 'POST_FAVORITE':
      return state
    default:
      return state
  }
}

function attestExpenses (state = defaultAttestExpense, action) {
  let newObj
  switch (action.type) {
    case 'TOGGLE_ATTESTS':
      let attestsList = state.attests.slice(0, state.attests.length) || []
      let index = attestsList.indexOf(action.data)
      if (index > -1) {
        attestsList.splice(index, 1)
      } else {
        attestsList.push(action.data)
      }
      newObj = {
        attests: attestsList
      }
      return Object.assign({}, state, newObj)
    default:
      return state
  }
}

function createAccountReducer (state = defaultCreateAccount, action) {
  let newObj
  switch (action.type) {
    case 'CHANGE_EMAIL_TEXT':
      newObj = {
        email: action.data
      }
      return Object.assign({}, state, newObj)
    case 'CHANGE_PASSWORD_TEXT':
      newObj = {
        password: action.data
      }
      return Object.assign({}, state, newObj)
    case 'CREATE_ACCOUNT':
      console.log('CREATE_ACCOUNT')
      return state
    default:
      return state
  }
}

/*
function animationReducer (state = defaultAnimation, action) {
  let newObj
  switch(action.type) {
    case: ''
  }
}
*/

export const store = createStore(
  reducers,
  applyMiddleware(thunk, logger, middleware)
)

export const emailvalidation = EmailValidation
export const addexpenses = AddExpenses
