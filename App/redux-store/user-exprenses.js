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
  return fetch('http://127.0.0.1:3000/getexpenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    console.log('RES:', res)
    return res.json()
  }).then(json => {
    console.log('JSON RES:', json)
    return json
  })
}

// thunk
export default (userId) => {
  return function (dispatch) {
    return getUserExpensesFetch(userId).then(
      data => {
        console.log('data in redux-state:', data)
        return dispatch(getUserExpenses(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
