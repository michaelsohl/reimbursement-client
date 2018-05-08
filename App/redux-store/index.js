import { logger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import EmailValidation from './email-validation'

const defaultState = {
  loginEmail: {
    value: '',
    loggedIn: false,
    feedback: '',
    data: {}
  }
}

// main reducer
function reduxReducer (state = defaultState, action) {
  // console.log('action:', action)
  // console.log('action type:', action.type)
  switch (action.type) {
    case 'LOGIN_EMAIL':
      const newObj = {
        loginEmail: {
          value: action.text,
          valid: true
        }
      }
      return Object.assign({}, state, newObj)
    case 'GET_DATA':
      return Object.assign({}, state, { data: action.data })
    case 'FEEDBACK':
      return Object.assign({}, state, { feedback: action.mess })
    default:
      return state
  }
}

export const createstore = createStore(
  reduxReducer,
  applyMiddleware(thunk, logger)
)
export const emailvalidation = EmailValidation
