import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StdButton from './std-button'

export default function (props) {
  return (
    <StdButton>
      <View style={{height: 20, width: 100}}>
        <Text style={{color: 'black', fontWeight: '700', right: 0}}>
          { props.date.slice(0, 10) }
        </Text>
      </View>
      <View style={styles.textAndPendingContainer}>
        <View style={{height: 50}}>
          <Text style={{fontSize: 10, color: 'grey'}}> { props.descr }  </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.client}  </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.km} </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.car_type} </Text>
        </View>
        <StatusSquare color={props.attest ? 'green' : 'grey'} />
      </View>
    </StdButton>
  )
}

const styles = {
  textAndPendingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
