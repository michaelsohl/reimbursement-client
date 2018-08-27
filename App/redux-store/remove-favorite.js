import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')
// action-creator
function postRemoveFavorite (data) {
  return {
    type: 'REMOVE_FAVORITE',
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

const postRemoveFavoriteFetch = (userId, favoriteId) => {
  var data = { userId, favoriteId }
  return fetch(`${config.host}removefavorite`, {
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
    return postRemoveFavoriteFetch(data.userId, data.favoriteId).then(
      data => {
        return dispatch(postRemoveFavorite(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
