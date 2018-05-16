import React, { Component } from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './statusSquare'

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={{height: 20, width: 100}}>
        <Text style={{color: 'black', right: 0}}> {props.date.slice(0, 10)} </Text>
      </View>
      <View style={styles.textAndPendingContainer}>
        <Text style={{color: 'black', textAlign: 'center'}}> { props.descr }  </Text>
        <StatusSquare color={props.attest ? 'green' : 'grey'} />
      </View>
    </View>
  )
}

const styles = {
  container: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#C21807'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  textAndPendingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
