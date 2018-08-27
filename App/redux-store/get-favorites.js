import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

function getFavorites (data) {
  return ({
    type: 'GET_FAVORITES',
    data
  })
}

function feedback (data) {
  return ({
    type: 'FEEDBACK',
    data
  })
}

const postGetFavorites = (userId) => {
  let data = { userId }
  return fetch(`${config.host}getfavorites`, {
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
export default (userId) => {
  return function (dispatch) {
    return postGetFavorites(userId).then(
      data => {
        return dispatch(getFavorites(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
