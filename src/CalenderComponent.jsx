import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[1]);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const onArrowPress = (direction) => {
    const date = new Date(currentMonth);
    if (direction === 'left') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    setCurrentMonth(date.toISOString().split('T')[0]);
  };

  const renderArrow = (direction) => {
    return (
      <Pressable style={styles.arrowContainer} onPress={() => onArrowPress(direction)}>
        <Text style={styles.arrowText}>{direction === 'left' ? '<' : '>'}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={currentMonth}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
            customStyles: {
              container: {
                backgroundColor: 'lightorange',
              },
              text: {
                color: '#fff',
              },
            },
          },
        }}
        style={styles.calendar}
        theme={{
          calendarBackground: 'transparent',
          selectedDayBackgroundColor: 'lightorange',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          arrowColor: 'transparent',
          monthTextColor: '#ffffff',
          textDayFontFamily: 'Arial',
          textMonthFontFamily: 'Arial',
          textDayHeaderFontFamily: 'Arial',
        }}
        renderArrow={direction => renderArrow(direction)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  calendar: {
    borderWidth: 0,
    width: '100%',
  },
  arrowContainer: {
    padding: 10,
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default MyCalendar;
