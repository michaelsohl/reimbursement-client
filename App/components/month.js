import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StdButton from './std-button'

const Months = {
  1: 'Januari',
  2: 'Februari',
  3: 'Mars',
  4: 'April',
  5: 'Maj',
  6: 'Juni',
  7: 'Juli',
  8: 'Augusti',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'December'
}

export default function (props) {
  console.log('months:', props.month)
  return (
    <View>
      <StdButton onPress={props.onPress} >
        <View style={styles.textAndPendingContainer}>
          <Text style={{color: 'black', textAlign: 'center'}}> { Months[props.month + 1] }  </Text>
          <StatusSquare color={props.attest ? 'green' : 'grey'} />
        </View>
      </StdButton>
      { props.children }
    </View>
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
