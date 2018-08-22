import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StatusQuestionSquare from './state-question-square'
import StdButton from './std-button'

export default function (props) {
  console.log('PROPS in an expense:', props)
  let status
  if (props.comment) {
    status = <StatusQuestionSquare size={20} color={'orange'} />
  } else {
    status = <StatusSquare size={20} color={props.attest ? 'green' : 'grey'} />
  }

  return (
    <StdButton onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={{height: 20, width: 100}}>
        <Text style={{color: 'black', fontWeight: '700', right: 0}}>
          { props.date.slice(0, 10) }
        </Text>
      </View>
      <View style={styles.textAndPendingContainer}>
        <View style={{height: 50}}>
          <Text style={{fontSize: 10, color: 'grey'}}> { props.descr}  </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.client}  </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.km + ' km'} </Text>
          <Text style={{fontSize: 10, color: 'grey'}}> {props.carType} </Text>
        </View>
        <Text style={{left: 100, top: -17, position: 'absolute', fontSize: 10, color: 'grey'}}> { props.admin ? props.name : ' '} </Text>
        { status }
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
