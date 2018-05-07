import { createStore } from 'redux'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

const defaultState = {
  loginEmail: {
    value: '',
    loggedIn: false,
    feedback: ''
  }
}

function storeFunction (state = defaultState, action) {
  console.log('action:', action)
  console.log('action type:', action.type)
  switch (action.type) {
    case 'LOGIN_EMAIL':
      // console.log('action.task in store:', action.text)
      const newObj = {
        loginEmail: {
          value: action.text,
          loggedIn: false,
          feedback: ''
        }
      }
      var data = { email: action.text }
      fetch('http://127.0.0.1:3000/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json()
      }).then(json => console.log('RESPONSE FROM SERVER:', json))
        .catch(err => console.log('ERROR:', err))

      return Object.assign({}, state, newObj)
    default:
      return state
  }
}

export default createStore(storeFunction)
