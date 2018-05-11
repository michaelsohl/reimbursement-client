import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Header from '../components/header'
import { createstore } from '../redux-store'
import getexpenses from '../redux-store/user-exprenses'
// import Header from './components/header'
// import store from './redux-store'

export default class ListScreen extends Component {
  constructor(props){
    super(props)
    this.state = createstore.getState()
    this.unsubscribe = createstore.subscribe(() => { this.setState(createstore.getState()) })
  }
  componentDidMount() {
    console.log('componentDidMount')
    createstore.dispatch(getexpenses('Michael Sohl'))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  signout = () => {
    this.props.navigation.navigate('Start')
  }
  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Sign out' onPress={this.signout} />
        <View style={styles.textContainer}>
        <Text style={styles.welcome}>
              Lista för utgifter!!
        </Text>
        </View>
          <ScrollView>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>
            <Text style={styles.welcome}>
              Lista för utgifter!!
            </Text>

          </ScrollView>
      </View>
    )
  }
}

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  textContainer: {
    height: 80,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: buttonThemeColor,
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  }
})
