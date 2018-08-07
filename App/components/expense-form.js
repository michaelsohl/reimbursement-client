import React, { Component } from 'react'
import { View, Text, TextInput, Switch, Slider, Picker, DatePickerIOS, PickerIOS, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Form from 'react-native-form'
import { Calendar } from 'react-native-calendars'
import StdTextInput from './std-text-input'
import Modal from 'react-native-modal'
import DateButton from '../components/date-button'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { sylogRed } from '../themes'
import CarButton from './car-button'
import StdButton from './std-button'
import Collapsible from 'react-native-collapsible'
import Selectable from './select-component'

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = { animationVal: new Animated.Value(), minHeight: 200, maxHeight: 250 }
  }

  toggle = () => {
    let initialValue = this.props.carSelectOpen ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
    finalValue = this.props.carSelectOpen ? this.state.minHeight : this.state.maxHeight + this.state.minHeight

    this.props.onCarPress()
    this.state.animationVal.setValue(initialValue)
    Animated.spring(
      this.state.animationVal,
      {
        toValue: finalValue       // Make it take a while
      }
    ).start()
  }

  _setMaxHeight = (event) => {
    this.setState({
        maxHeight   : event.nativeEvent.layout.height
    })
}

  _setMinHeight = (event) => {
    this.setState({
      minHeight   : event.nativeEvent.layout.height
    })
  }

  render() {
    let date = {}
    const { expenseProps } = this.props
    
    if (!(typeof(expenseProps.date) == 'string')) {
      date[expenseProps.date.dateString]= {
        selected: true,
        selectedColor: sylogRed
      }
    } else {
      date[expenseProps.date]= {
        selected: true,
        selectedColor: sylogRed
    }}
    console.log('123:', this.props.carTypes)
    console.log('456:', expenseProps.carType)
    return (
      <TouchableWithoutFeedback 
        onPress={() => {  
          console.log('hejsan keybord dismiss #########################################') 
          Keyboard.dismiss()} }
        onPressOut={() => { console.log('hejsan keybord dismiss 22222 #########################################')  } } >
      <View style={styles.container} >
        <StdTextInput onChangeText={this.props.onChange('km')} label='km' value={expenseProps.km}  />
        <StdTextInput onChangeText={this.props.onChange('client')} label='kund' value={expenseProps.client}  />
        <StdTextInput onChangeText={this.props.onChange('route_descr')} label='Färdbeskr.' value={expenseProps.route_descr}  />
        <CarButton onPress={ this.toggle } label={expenseProps.carType}/>
        <Collapsible collapsed={this.props.carSelectOpen}>
        { this.props.renderSelectables(this.props.carTypes, expenseProps.carType) }
        </Collapsible>
        <DateButton date={null} text={expenseProps.date} onPress={this.props.onPress('date')} />
        <Modal isVisible={this.props.modelOpen}> 
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}> Välj datum </Text>
            </View>
            <Calendar
              style= {{width: 300}}
              // eventDates={['2018-06-13']}       // Optional array of moment() parseable dates that will show an event indicator
              // events={[{ date: '2018-06-12' }]} // Optional array of event objects with a date property and custom styles for the event indicator
              onDayPress={this.props.onChange('date')}
              theme={{arrowColor: sylogRed}}
              onSwipeNext={() => {}}    // Callback for forward swipe event
              onSwipePrev={() => {}}    // Callback for back swipe event
              onTouchNext={() => {}}    // Callback for next touch event
              onTouchPrev={() => {}}    // Callback for prev touch event
              onTitlePress={() => {}}  // Callback on title press
              prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
              removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
              scrollEnabled={true}              // False disables swiping. Default: False
              selectedDate={date}       // Day to be selected
              showControls={true}               // False hides prev/next buttons. Default: False
              showEventIndicators={true}        // False hides event indicators. Default:False
              markedDates={date}
              titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
              showWeekNumbers={true}
            />
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor: 'white', borderRadius: 10, margin: 20}} onPress={this.props._toggleModal} >
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> Stäng fönster </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      </ TouchableWithoutFeedback>
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
 *   
 *     <Calendar
              // Initially visible month. Default = Date()
    
              current={'2012-03-01'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {this.props.onChange('date')(date)}}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {console.log('selected day', day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {console.log('month changed', month)}}
              // Hide month navigation arrows. Default = false
              hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              renderArrow={(direction) => (<Arrow />)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              />
 */