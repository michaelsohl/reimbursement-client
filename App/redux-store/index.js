import { createStore } from 'redux'

const defaultState = {
  navigation: [
    {
      screen: 'A'
    }
  ]}

function storeFunction (state = defaultState, action) {
  switch (action.type) {
    case 'GO_TO_SCREEN_B':
      Object.assign({}, state, {
        navigation: state.navigation.concat([{
          screen: action.task
        }])
      })
  }
}

export default createStore(storeFunction)
