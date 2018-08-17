import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

// action-creator
function postUserExpenses (data) {
  return {
    type: 'POST_FAVORITE',
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

const postUserFavoriteFetch = (userId, favoriteProps) => {
  var data = { userId, favoriteProps }
  return fetch(`${config.host}addfavorite`, {
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
export default (userId, favoriteProps) => {
  return function (dispatch) {
    return postUserFavoriteFetch(userId, favoriteProps).then(
      data => {
        return dispatch(postUserExpenses(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
