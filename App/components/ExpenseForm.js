import React, { Component } from 'react'
// import { View, Text, TextInput, Switch, Slider, Picker, DatePickerIOS, PickerIOS } from 'react-native'
// import Form from 'react-native-form'
import { View, Text } from 'react-native'
export default class ExpenseForm extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Hello </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  }
}

/**
 * <Form ref='form'>
          <View>
            <View>
              <TextInput type='TextInput' name='myTextInput' /> // Yes, it doesn't matter how deep they are :)
            </View>
          </View>
          <Switch type='Switch' name='mySwitch' />
          <Slider type='Slider' name='mySlider' />
          <DatePickerIOS type='DatePickerIOS' name='myBirthday' />
          <Picker type='Picker' name='myPicker' />
  
          <PickerIOS type='PickerIOS' name='pickers[ios]' /> // Yes, we support form serialization, like the web
        </Form>
 */