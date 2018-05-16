import { logger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import EmailValidation from './email-validation'

const userDefaultState = {
  expenses: []
}

const loginDefaultState = {
  value: '',
  loggedIn: false,
  feedback: '',
  data: false
}

const reducers = combineReducers({
  loginEmail: loginReducer,
  userExpenses: getUserReducer
})
// main reducer
function loginReducer (state = loginDefaultState, action) {
  // console.log('action:', action)
  // console.log('action type:', action.type)
  console.log('loginReducer')
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
        data: action.data
      }
      return Object.assign({}, state, newObj)
    case 'FEEDBACK':
      return Object.assign({}, state, { feedback: action.mess })
    default:
      return state
  }
}

function getUserReducer (state = userDefaultState, action) {
  console.log('getUserReducer:', action.data)
  let newObj
  console.log('action:', action)
  switch (action.type) {
    case 'GET_USER_EXPENSES':
      newObj = {
        expenses: action.data
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
