import { createStore } from 'redux'

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
      return Object.assign({}, state, newObj)
    default:
      return state
  }
}

export default createStore(storeFunction)
