import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TaskContext} from './TaskContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const DisplayTask = () => {
  const {tasks, handleEdit, handleToggle, searchQuery} =
    useContext(TaskContext);

  const navigation = useNavigation();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEditTask = id => {
    handleEdit(id);
    navigation.navigate('Input');
  };

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View style={styles.tasktext}>
        <View style={styles.taskInnertext}>
          <CheckBox
            value={item.completed}
            onValueChange={() => handleToggle(item.id)}
            style={styles.checkBox}
          />
          <Pressable onPress={() => handleEditTask(item.id)}>
            <Text style={[styles.task, item.completed && styles.completedTask]}>
              {item.text}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.selectedTagsContainer}>
        {item.tags.map(tag => (
          <View key={tag.id} style={styles.selectedTag}>
            <Icon name="label" size={20} style={styles.selectedTagText} />

            <Text style={styles.selectedTagText}>{tag.tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ff5544',
    marginBottom: 20,
  },
  functions: {
    flexDirection: 'row',
    gap: 10,
  },
  tasktext: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  taskInnertext: {
    flexDirection: 'row',
    gap: 10,
  },
  task: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#ff5544',
    paddingBottom: 7,
  },
  checkBox: {
    marginRight: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  },
  selectedTag: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    flexDirection: 'row',
    gap: 5,
    borderRadius: 20,
  },
  selectedTagText: {
    color: 'white',
    fontSize: 13,
    marginRight: 10,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default DisplayTask;
