import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StatusQuestionSquare from './state-question-square'
import StdButton from './std-button'

export default function (props) {
  let status = null
  console.log('props.admin:', props.admin)
  if (props.comment) {
    status = <StatusQuestionSquare size={20} color={'orange'} />
  } else {
    status = <StatusSquare size={20} color={props.attest ? 'green' : 'grey'} />
  }
  if (props.expenseUserId === props.userId && props.admin) {
    status = null
  }

  return (
    <StdButton onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={{height: 70}}>
        <View style={{height: 20, width: 100}}>
          <Text style={{fontSize: 15, fontFamily: 'Helvetica', fontWeight: '400', right: 0}}>
            { props.date.slice(0, 10) }
          </Text>
        </View>
        <View style={styles.textAndPendingContainer}>
          <View style={{height: 50}}>
            <Text style={styles.textStyle}> { props.descr}  </Text>
            <Text style={styles.textStyle}> {props.client}  </Text>
            <Text style={styles.textStyle}> {props.km + ' km'} </Text>
            <Text style={styles.textStyle}> {props.carType} </Text>
          </View>
          <Text style={{left: 250, top: -17, position: 'absolute', fontSize: 10, fontFamily: 'Helvetica', fontWeight: '100'}}> { props.admin ? props.name : ' '} </Text>
          { status }
        </View>
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
  },
  textStyle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: '100'
  }
}
