import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

// action-creator
function getUserExpenses (data) {
  return {
    type: 'GET_USER_EXPENSES',
    data
  }
}

function feedback (mess) {
  return {
    type: 'feedback',
    mess
  }
}

// fetch
const getUserExpensesFetch = (userId) => {
  var data = { userId }
  return fetch(`${config.host}getexpenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then(json => {
    console.log('JSON response:', json)
    return json
  })
}

// thunk
export default (userId) => {
  return function (dispatch) {
    return getUserExpensesFetch(userId).then(
      data => {
        return dispatch(getUserExpenses(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
