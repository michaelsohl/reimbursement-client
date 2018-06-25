import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  let date
  date = getDateString(props.text)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} >
        <View style={{width: 200, height: 40}}>
          <Text> { date } </Text>
        </View>
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
    width: 300,
    margin: 20
  }
}