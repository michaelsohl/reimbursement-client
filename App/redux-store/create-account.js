import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')
// action-creator
function postCreateAccount (data) {
  return {
    type: 'CREATE_ACCOUNT',
    data
  }
}

function feedback (mess) {
  return {
    type: 'feedback',
    mess
  }
}

const postCreateAccountFetch = (email, password) => {
  console.log('apRÖV:', email + ' ' + password)
  var data = { email, password }
  console.log('data:', data)
  return fetch(`${config.host}createaccount`, {
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
    return postCreateAccountFetch(data.email, data.password).then(
      data => {
        return dispatch(postCreateAccount(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
