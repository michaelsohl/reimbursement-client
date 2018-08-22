import config from '../config'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

function updateComment (data) {
  return {
    type: 'UPDATE_COMMENT',
    data
  }
}

function feedback (data) {
  return {
    type: 'FEEDBACK',
    data
  }
}

const postUpdateCommentFetch = (userId, expenseId, comment) => {
  const data = {userId, expenseId, comment}
  return fetch(`${config.host}updatecomment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then(json => {
    return json
  })
}

export default (data) => {
  return function (dispatch) {
    return postUpdateCommentFetch(data.userId, data.expenseId, data.comment).then(
      data => {
        return dispatch(updateComment(data))
      },
      error => dispatch(feedback(error))
    )
  }
}
