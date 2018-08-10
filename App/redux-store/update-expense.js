import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')
// action-creator
function postUpdateExpense (data) {
  return {
    type: 'POST_UPDATE_EXPENSE',
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
// // date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}

const postUpdateExpenseFetch = (userId, expenseId, expenseProps) => {
  var data = { userId, expenseId, expenseProps }
  return fetch(`${config.host}updateexpense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then(json => {
    return json
  })
}

// thunk
export default (data) => {
  return function (dispatch) {
    return postUpdateExpenseFetch(data.userId, data.expenseId, data.expenseProps).then(
      data => {
        return dispatch(postUpdateExpense(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
