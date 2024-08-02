import React, {useState, useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TaskContext} from './TaskContext';
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
  const {
    handleTasks,
    input,
    setInput,
    selectedDate,
    selectedTime,
    editingId,
    handleDelete,
  } = useContext(TaskContext);
  const [selectedRadioIndex, setSelectedRadioIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigation = useNavigation();

  const handleSave = () => {
    const tagIds = selectedTags.map(tag => tag.id);
    handleTasks(tagIds, selectedDate);
    navigation.navigate('Home');
  };

  const handleRadioButtonPress = index => {
    setSelectedRadioIndex(index);
  };

  const handleCalendar = () => {
    navigation.navigate('Calendar');
  };

  const handleAddTags = () => {
    navigation.navigate('AddTag', {
      onTagsSelected: tags => setSelectedTags(tags),
    });
  };

  const handleDeleteTask = id => {
    handleDelete(id);
    navigation.goBack();
  };

  const multiColorButtons = ['#fff', '#00b0fa', '#fae800', '#fa000d'];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={handleSave} style={styles.saveTask}>
            <Icon name="save" size={26} style={styles.selectedTagText} />
          </Pressable>
          {editingId && (
            <Pressable
              onPress={() => handleDeleteTask(editingId)}
              style={styles.saveTask}>
              <Icon name="delete" size={26} style={styles.selectedTagText} />
            </Pressable>
          )}
        </View>
        <TextInput
          style={styles.TextInput}
          value={input}
          onChangeText={value => setInput(value)}
          placeholder="Task name"
          placeholderTextColor={'#bbb'}
        />
      </View>
      <View style={styles.functions}>
        <Pressable style={styles.Day} onPress={handleCalendar}>
          <Icon name="calendar-today" size={23} style={styles.dayIcon} />
          <Text style={[styles.repeatText, selectedDate && styles.dayText]}>
            {selectedDate || selectedTime
              ? selectedDate + ' ' + selectedTime
              : 'No start date'}
          </Text>
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
        <Pressable style={styles.Day} onPress={handleAddTags}>
          <Icon name="label" size={23} style={styles.dayIcon} />

          {!selectedTags.length > 0 ? (
            <Text style={styles.repeatText}>Add tags</Text>
          ) : (
            <View style={styles.selectedTagsContainer}>
              {selectedTags.map(tag => (
                <View key={tag.id} style={styles.selectedTag}>
                  <Icon name="label" size={20} style={styles.selectedTagText} />

                  <Text style={styles.selectedTagText}>{tag.tag}</Text>
                  <Icon
                    name="cancel"
                    size={20}
                    style={styles.selectedTagText}
                  />
                </View>
              ))}
            </View>
          )}
        </Pressable>
        <View style={styles.Day}>
          <Icon name="notifications" size={23} style={styles.dayIcon} />
          <Text style={styles.repeatText}>Add reminder</Text>
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
    backgroundColor: '#1a1a1a',
  },
  innerContainer: {
    padding: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  radioButtonInner: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectedTag: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    flexDirection: 'row',
    gap: 4,
    borderRadius: 20,
  },
  selectedTagText: {
    color: 'white',
  },
});

export default AddTask;
