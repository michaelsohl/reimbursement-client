import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  let date
  date = getDateString(props.text)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} >
        <Text style={{ fontFamily: 'Helvetica', fontSize: 20, fontWeight: '100', padding: 5, left: -5 }}> { date } </Text>
      </TouchableOpacity>
      <Divider style={{backgroundColor: 'grey'}} />
    </View>
  )
}

const getDateString = (input) => {
  if (!input) {
    // never occurs
    return (new Date()).getFullYear()
  } else {
    if (input && input.hasOwnProperty('dateString')) {
      return input.dateString
    } else {
      return input
    }
  }
}

const styles = {
  container: {
    height: 35,
    position: 'relative',
    width: '100%',
    top: 40
  }
}
