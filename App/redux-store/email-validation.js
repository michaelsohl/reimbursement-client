import config from '../config'

require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

// action-creator
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

// fetch
const checkWithServerIfEmailValidFetch = (email, password) => {
  let data = { email, password }
  return fetch(`${config.host}authenticate`, {
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
    return checkWithServerIfEmailValidFetch(data.email, data.password).then(
      data => {
        return dispatch(getData(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
