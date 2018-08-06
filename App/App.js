import React, { Component } from 'react'
import AppNavigator from './navigation'
import { Provider, connect } from 'react-redux'
import { store } from './redux-store'
import {
  reduxifyNavigator
} from 'react-navigation-redux-helpers'

const NavApp = reduxifyNavigator(AppNavigator, 'root')

const mapStateToProps = (state) => ({
  state: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(NavApp)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
