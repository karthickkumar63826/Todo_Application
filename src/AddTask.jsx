import React, {useState, useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TaskContext} from './context/TaskContext';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const CustomRadioButton = ({selected, onPress, color}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        style={[
          styles.radioButton,
          {borderColor: color},
          selected && {backgroundColor: color},
        ]}
        onPress={onPress}>
        {selected && <View style={styles.radioButtonInner} />}
      </TouchableOpacity>
    </View>
  );
};

const AddTask = () => {
  const {handleTasks, input, setInput} = useContext(TaskContext);
  const [selectedRadioIndex, setSelectedRadioIndex] = useState(null);
  const navigation = useNavigation();

  const handleSave = () => {
    handleTasks();
    navigation.navigate('Home');
  };

  const handleRadioButtonPress = index => {
    setSelectedRadioIndex(index);
  };

  const handleCalender = () => {
    navigation.navigate('Calendar');
  };

  const multiColorButtons = ['#fff', '#00b0fa', '#fae800', '#fa000d'];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable onPress={handleSave} style={styles.saveTask}>
          <Icon name="save" size={26} />
        </Pressable>
        <TextInput
          style={styles.TextInput}
          value={input}
          onChangeText={value => setInput(value)}
          placeholder="Task name"
          placeholderTextColor={'#bbb'}
        />
      </View>
      <View style={styles.functions}>
        <Pressable style={styles.Day} onPress={handleCalender}>
          <Icon name="calendar-today" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>No start date</Text>
        </Pressable>
        <View style={styles.Day}>
          <Icon name="schedule" size={23} style={styles.dayIcon} />
          <Text style={styles.dayText}>Today</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="repeat" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Does not repeat</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="flag" size={23} style={styles.dayIcon} />
          <Text style={styles.dayText}>Priority</Text>
          <View style={styles.radioButtonContainer}>
            {multiColorButtons.map((color, index) => (
              <CustomRadioButton
                key={index}
                selected={selectedRadioIndex === index}
                onPress={() => handleRadioButtonPress(index)}
                color={color}
              />
            ))}
          </View>
        </View>
        <View style={styles.Day}>
          <Icon name="location-on" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Add location</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="label" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Add tags</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="notifications" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Add remainder</Text>
        </View>
        <View style={styles.Day}>
          <Icon
            name="subdirectory-arrow-right"
            size={23}
            style={styles.dayIcon}
          />
          <Text style={styles.repeatText}>Add subtask</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="attachment" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Add attachments</Text>
        </View>
        <View style={styles.Day}>
          <Icon name="edit-note" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Description</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 10,
    marginBottom: 10,
  },
  saveTask: {
    paddingLeft: 2,
  },
  TextInput: {
    marginTop: 10,
    fontSize: 25,
    color: '#bbb',
  },

  functions: {
    flex: 1,
  },
  Day: {
    flexDirection: 'row',
    gap: 35,
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#515151',
    padding: 17,
  },
  dayIcon: {
    color: 'gray',
  },
  dayText: {
    color: '#bbb',
    fontSize: 17,
  },
  repeatText: {
    color: '#5f5f5f',
    fontSize: 17,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRadioButton: {
    backgroundColor: '#FF6347',
  },
  radioButtonInner: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  label: {
    fontSize: 18,
  },
});

export default AddTask;
