import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

function toggleAttest (data) {
  return {
    type: 'POST_ATTEST',
    data
  }
}

function feedback (mess) {
  return {
    type: 'ATTEST_FEEDBACK',
    mess
  }
}

const postToggleAttest = function (userId, expenseId) {
  var data = { userId, expenseId }
  return fetch(`${config.host}toggleexpense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then(json => {
    return json
  })
}

export default (userId, expenseId) => {
  return function (dispatch) {
    return postToggleAttest(userId, expenseId).then(
      data => dispatch(toggleAttest(data)),
      err => dispatch(feedback(err)))
  }
}
