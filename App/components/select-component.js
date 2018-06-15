import React from 'react'
import { View, Text } from 'react-native'
import StatusSquare from './status-square'
import StdButtonSmall from './std-button-small'
import { sylogRed } from '../themes'

export default function (props) {
  return (
    <StdButtonSmall onPress={props.onPress}>
      <View style={styles.textAndPendingContainer}>
        <View style={{height: 20, width: 200}}>
          <Text style={{color: 'black', fontSize: 10, fontWeight: '400', right: 0}}>
            { props.descr }
          </Text>
        </View>
        <StatusSquare size={15} color={props.attest ? sylogRed : 'grey'} />
      </View>
    </StdButtonSmall>
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
