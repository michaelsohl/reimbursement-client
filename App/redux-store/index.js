import { logger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import EmailValidation from './email-validation'
import AddExpenses from './add-expenses'
import deepFreeze from 'deep-freeze'
// import { reducer as formReducer } from 'redux-form'

const userDefaultState = {
  _id: '',
  name: '',
  email: '',
  admin: false,
  expenses: [],
  formattedExpenses: [],
  monthFormattedExpenses: [],
  monthIndex: -1,
  expenseJustAdded: false
}

const loginDefaultState = {
  value: '',
  loggedIn: false,
  feedback: '',
  data: false,
  userId: ''
}

const defaultExpense = {
  addedExpense: { attest: false }
}

const reducers = combineReducers({
  loginEmail: loginReducer,
  userExpenses: getUserReducer,
  addExpenses: addExpensesReducer
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
      console.log('DATA MF:', action.data)
      newObj = {
        data: action.data.validEmail,
        userId: action.data.userId
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
    case 'TURN_OFF_UPDATE_FLAG':
      newObj = {
        expenseJustAdded: false
      }
      return Object.assign({}, state, newObj)
    case 'POST_USER_EXPENSES':
      console.log('POST_USER_EXPENSES')
      newObj = {
        expenseJustAdded: true
      }
      return Object.assign({}, state, newObj)
      // return state
    case 'GET_USER_EXPENSES':
      console.log('data:', action.data.expenses)
      let expensesList = action.data.expenses.slice(0, action.data.expenses.length)
      deepFreeze(action.data.expenses)
      if (expensesList.length == 0) return state
      
      expensesList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })

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

      monthFormattedExpenses.forEach(elem => {
        console.log(elem)
      })

      newObj = {
        _id: action.data._id,
        name: action.data.name,
        email: action.data.email,
        admin: action.data.admin,
        expenses: action.data.expenses,
        formattedExpenses: expensesList,
        monthFormattedExpenses: monthFormattedExpenses
      }

      return Object.assign({}, state, newObj)
    case 'SETUP_FORMATTED_EXPENSES':
      const { expenses } = state
      console.log('expenses:', expenses)
      newObj = {
        formattedExpenses: expenses
      }
      return Object.assign({}, state, newObj)
    case 'SET_MONTH_SCREEN':
      newObj = {
        monthIndex: action.index
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
    case 'ADD_NEW_EXPENSE_DATE':
      obj = Object.assign({}, state.addedExpense, {date: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_CARTYPE':
      obj = Object.assign({}, state.addedExpense, {car_type: action.data})
      newObj = {
        addedExpense: obj
      }
      return Object.assign({}, state, newObj)
    case 'ADD_NEW_EXPENSE_KM':
      console.log('ADD_NEW_EXPENSE_KM')

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
    default:
      return state
  }
}

export const createstore = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)
export const emailvalidation = EmailValidation
export const addexpenses = AddExpenses
