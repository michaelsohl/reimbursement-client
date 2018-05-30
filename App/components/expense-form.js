import React, { Component } from 'react'
import { View, Text, TextInput, Switch, Slider, Picker, DatePickerIOS, PickerIOS } from 'react-native'
import Form from 'react-native-form'
import Calendar from 'react-native-calendar'
import StdTextInput from './std-text-input'
//  import DatePicker from 'react-datepicker'
// import moment from 'moment'

// import { View, Text } from 'react-native'
console.log('apa:', StdTextInput)
export default class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = { language: "js", date: new Date(), kr: '', km: '', kund: '', route: '' }
  }
  onDateChange = date => {
    this.setState({ date: date })
  }

  onChangeText = text => {
    this.setState({text})
  }
  render() {
    return (
      <View style={styles.container}>
        <StdTextInput onChangeText={this.props.onChange('km')} label='km' value={this.props.expenseProp.km}  />
        <StdTextInput onChangeText={this.props.onChange('client')} label='kund' value={this.props.expenseProp.client}  />
        <StdTextInput onChangeText={this.props.onChange('route')} label='Färdbeskr.' value={this.props.expenseProp.route_descr}  />
        <StdTextInput onChangeText={this.props.onChange('car')} label='Biltyp.' value={this.props.expenseProp.car_type}  />
        <Text> Datum: 2018-05-28 </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  }
}

/**
 *
 *   <StdTextInput onChangeText={this.props.onChange.} label='kr' value={this.state.kr}  />
 *  <DatePicker
          selected={this.state.value}
          onChange={ (x) => {} }
        />

        <Calendar
          style={{height: 50}}
          customStyle={{ day: { fontSize: 10, textAlign: 'center', width: 100 } }} // Customize any pre-defined styles
          eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
          events={[{ date: '2015-07-01' }]}// Optional array of event objects with a date property and custom styles for the event indicator
          onDateSelect={(date) => this.onDateChange(date)} // Callback after date selection
          onDateLongPress={(date) => this.onDateChange(date)} // Callback after date is long pressed
          onSwipeNext={() => {}}    // Callback for forward swipe event
          onSwipePrev={() => {}}    // Callback for back swipe event
          onTouchNext={() => {}}    // Callback for next touch event
          onTouchPrev={() => {}}    // Callback for prev touch event
          onTitlePress={() => {}}  // Callback on title press
          prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
          removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
          scrollEnabled={true}              // False disables swiping. Default: False
          selectedDate={'2015-08-15'}       // Day to be selected
          showControls={true}               // False hides prev/next buttons. Default: False
          showEventIndicators={true}        // False hides event indicators. Default:False
          titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
          weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
        />
 */