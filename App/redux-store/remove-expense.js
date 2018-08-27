import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')
// action-creator
function postRemoveExpense (data) {
  return {
    type: 'REMOVE_EXPENSE',
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

const postRemoveExpenseFetch = (userId, expenseId) => {
  var data = { userId, expenseId }
  return fetch(`${config.host}removeexpense`, {
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
    return postRemoveExpenseFetch(data.userId, data.expenseId).then(
      data => {
        return dispatch(postRemoveExpense(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
