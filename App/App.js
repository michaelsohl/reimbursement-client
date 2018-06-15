import React, { Component } from 'react'
import MainNavigator from './navigation'
// import { Provider } from 'react-redux'
// import { createstore } from './redux-store'

export default class App extends Component {
  render () {
    return (
      <MainNavigator />
    )
  }
}

/**
 * <Provider store={createstore}>
        <MainNavigator />
      </Provider>
 */