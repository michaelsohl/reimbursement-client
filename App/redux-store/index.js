import { logger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

const defaultState = {
  loginEmail: {
    value: '',
    loggedIn: false,
    feedback: '',
    data: {}
  }
}

const checkWithServerIfEmailValidFetch = (email) => {
  var data = { email }
  return fetch('http://127.0.0.1:3000/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then(json => {
    return json.validEmail
  })
}

// thunk function
export const checkWithServerIfEmailValid = (email) => {
  return function (dispatch) {
    return checkWithServerIfEmailValidFetch(email).then(
      data => {
        console.log('data in redux-state:', data)
        return dispatch(getData(data))
      },
      error => dispatch(feedback(error))
    )
  }
}

// Action creator
function getData (data) {
  return {
    type: 'GET_DATA',
    data
  }
}

function feedback (mess) {
  return {
    type: 'FEEDBACK',
    mess
  }
}

function storeFunction (state = defaultState, action) {
  // console.log('action:', action)
  // console.log('action type:', action.type)
  switch (action.type) {
    case 'LOGIN_EMAIL':
      // console.log('action.task in store:', action.text)
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

export const cs = createStore(
  storeFunction,
  applyMiddleware(thunk, logger)
)

/*
      fetch('http://127.0.0.1:3000/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json()
      }).then(json => {
        newObj.loginEmail.valid = json.validEmail
        console.log('Redux validation of email:', json.validEmail)
      })
        .catch(err => console.log('ERROR:', err))
      */