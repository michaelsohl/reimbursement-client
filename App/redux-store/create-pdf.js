import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')
// action-creator
function postCreatePdf (data) {
  return {
    type: 'CREATE_PDF',
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

const postCreatePdfFetch = (year, month) => {
  var data = { year, month }
  console.log('date sent:', data)
  return fetch(`${config.host}createpdf`, {
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
    return postCreatePdfFetch(data.year, data.month).then(
      data => {
        return dispatch(postCreatePdf(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
