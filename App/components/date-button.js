import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Divider } from 'react-native-elements'

export default function (props) {
  let date
  if (!props.text) {
    date = (new Date()).getFullYear()
  } else {
    if (props.text && props.text.hasOwnProperty('dateString')) {
      console.log('date.hasOwnProperty(dateString)')
      date = props.text.dateString
    } else {
      console.log('Object does not have dateString')
      date = props.text
    }
  }
  console.log('DATE:', date)
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

const styles = {
  container: {
    height: 35,
    width: 300,
    margin: 20
  }
}
