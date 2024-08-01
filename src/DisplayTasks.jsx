import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TaskContext} from './TaskContext';

const DisplayTask = () => {
  const {tasks, handleEdit, handleDelete, handleToggle, searchQuery} =
    useContext(TaskContext);

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View style={styles.tasktext}>
        <CheckBox
          value={item.completed}
          onValueChange={() => handleToggle(item.id)}
          style={styles.checkBox}
        />
        <Text style={[styles.task, item.completed && styles.completedTask]}>
          {item.text}
        </Text>
      </View>
      <View style={styles.functions}>
        <Pressable
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  functions: {
    flexDirection: 'row',
    gap: 10,
  },
  tasktext: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    fontSize: 18,
    fontWeight: '600',
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
    borderColor: '#007BFF',
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
});

export default DisplayTask;
