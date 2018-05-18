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
const checkWithServerIfEmailValidFetch = (email) => {
  let data = { email }
  return fetch('http://127.0.0.1:3000/authenticate', {
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
export default (email) => {
  return function (dispatch) {
    return checkWithServerIfEmailValidFetch(email).then(
      data => {
        return dispatch(getData(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
