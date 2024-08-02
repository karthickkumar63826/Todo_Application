import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TaskContext} from './TaskContext';

const DateTime = ({date}) => {
  const [mainDate, setMainDate] = useState('');

  const {setSelectedDate, setSelectedTime, selectedDate, selectedTime} = useContext(TaskContext);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const checkDate = () => {
      if (date === today) {
        setMainDate('Today');
      } else {
        const correctFormat = date.split('/').join('-');
        setMainDate(formatDate(correctFormat));
      }
    };
    checkDate();
  }, [date]);

  const formatDate = dateString => {
    const date = new Date(dateString + 'T00:00:00Z');
    const day = date.getDate().toString();
    const month = date.toLocaleString('default', {month: 'short'});
    return `${day} ${month}`;
  };

  const handleDatePress = text => {
    setSelectedDate(text);
  };

  const handleTimePress = text => {
    setSelectedTime(text);
  };

  const getTextColor = (text, selectedText) => ({
    color: text === selectedText ? 'lightcoral' : '#918d8d',
  });

  dayIcon = [
    'event',
    'calendar-today',
    'schedule',
    'wb-sunny',
    'date-range',
    'block',
  ];
  timeIcon = [
    'local-cafe',
    'wb-sunny',
    'wb-twilight',
    'nights-stay',
    'schedule',
    'block',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        {[
          mainDate,
          'Due Date',
          'Due Time',
          'Day before due',
          'Week before due',
          'No date',
        ].map((item, index) => (
          <Pressable
            key={index}
            style={styles.pressable}
            onPress={() => handleDatePress(item)}>
            <Icon
              name={dayIcon[index]}
              size={25}
              color={getTextColor(item, selectedDate).color}
            />
            <Text style={[styles.dateText, getTextColor(item, selectedDate)]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.timeContainer}>
        {['9 am', '1 pm', '5 pm', '8 pm', 'Pick time', 'No time'].map(
          (item, index) => (
            <Pressable
              key={index}
              style={styles.pressable}
              onPress={() => handleTimePress(item)}>
              <Icon
                name={timeIcon[index]}
                size={25}
                color={getTextColor(item, selectedTime).color}
              />
              <Text style={[styles.timeText, getTextColor(item, selectedTime)]}>
                {item}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    color: '#918d8d',
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
  },
});

export default DateTime;
