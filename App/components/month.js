import React from 'react'
import { View, Text } from 'react-native'
import StdButton from './std-button'
import { Months } from '../lib/dates'

export default function (props) {
  console.log('months:', props.month)
  return (
    <View>
      <StdButton onPress={props.onPress} >
        <View style={{flex: 1}}>
          <View style={styles.textAndPendingContainer}>
            <Text style={{color: 'black', textAlign: 'center'}}> { Months[props.month + 1] }  </Text>
            <Text style={{color: 'black', fontSize: 12, fontWeight: '700'}}>  Reseutlägg </Text>
          </View>
          <Text style={{left: 6, bottom: 10, fontSize: 10, color: 'grey'}}> {props.year} </Text>
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
