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
  // console.log('hejsan:', userId)
  return fetch(`${config.host}getfavorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    // console.log('res:', res)
    return res.json()
  }).then(json => {
    // console.log('res:', json)
    return json
  })
}

// thunk
export default (userId) => {
  // console.log('userId:', userId)
  return function (dispatch) {
    // console.log('do we get here?')
    return postGetFavorites(userId).then(
      data => {
        // console.log('or how about here?')
        return dispatch(getFavorites(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
