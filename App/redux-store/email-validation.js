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
  console.log('email:', email)
  let data = { email }
  console.log('data:', data)
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

// thunk
export default (email) => {
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
