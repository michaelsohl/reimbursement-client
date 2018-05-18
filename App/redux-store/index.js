import { logger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import EmailValidation from './email-validation'
import deepFreeze from 'deep-freeze'

const userDefaultState = {
  _id: '',
  name: '',
  email: '',
  admin: false,
  expenses: [],
  formattedExpenses: [],
  monthFormattedExpenses: [],
  monthIndex: -1
}

const loginDefaultState = {
  value: '',
  loggedIn: false,
  feedback: '',
  data: false,
  userId: ''
}

const reducers = combineReducers({
  loginEmail: loginReducer,
  userExpenses: getUserReducer
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
  console.log('state in getUserReducer:', state)
  let newObj
  let monthFormattedExpenses = []
  switch (action.type) {
    case 'GET_USER_EXPENSES':
      let expensesList = action.data.expenses.slice(0, action.data.expenses.length)
      deepFreeze(action.data.expenses)
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

      // let newList = []
      // if (state.formattedExpenses.length == 0) {
      //  state.formattedExpenses.concat
      // } else {

      // }

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
    case 'GET_MONTH_EXPENSES':
      newObj = {
        monthIndex: action.index
      }
      return Object.assign({}, state, newObj)
    default:
      return state
  }
}

// Setup datastructures reducer
// function setExpensesTreeFormat (state = expensesFormatDefaultState, action) {

// }

export const createstore = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)
export const emailvalidation = EmailValidation
