import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import DateTime from './DateTime';
import {useNavigation} from '@react-navigation/native';

const MyCalendar = () => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);



  const navigation = useNavigation();

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  const handleCancel = () => {
    navigation.navigate('Input');
  };

  const handleOkay = () => {
    navigation.navigate('Input');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.dateContainer}>
        <DateTime
          date={date}
        />
      </View>
      <View style={styles.container}>
        <DatePicker
          mode="calendar"
          selected={date}
          onDateChange={handleDateChange}
          options={{
            textHeaderColor: '#fff',
            textDefaultColor: '#fff',
            selectedTextColor: '#000',
            mainColor: 'lightcoral',
            textSecondaryColor: '#999',
            backgroundColor: '#3b3a3a',
          }}
        />
        <View style={styles.btnContainer}>
          <Pressable onPress={handleCancel}>
            <Text style={styles.btnText}>CANCEL</Text>
          </Pressable>
          <Pressable onPress={handleOkay}>
            <Text style={styles.btnText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3b3a3a',
    justifyContent: 'center',
  },
  dateContainer: {
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectedDate: {
    fontSize: 18,
    marginVertical: 20,
  },
  btnContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
    padding: 10,
  },
  btnText: {
    fontSize: 15,
    marginRight: 30,
    fontWeight: '600',
    color: 'lightcoral',
  },
});

export default MyCalendar;
