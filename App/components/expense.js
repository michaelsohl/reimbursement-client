import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StdButton from './std-button'

export default function (props) {
  return (
    <StdButton>
      <View style={{height: 20, width: 100}}>
        <Text style={{color: 'black', right: 0}}>
          { props.date.slice(0, 10) }
        </Text>
      </View>
      <View style={styles.textAndPendingContainer}>
        <Text style={{color: 'black', textAlign: 'center'}}> { props.descr }  </Text>
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
