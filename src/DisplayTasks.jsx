import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const DisplayTask = ({tasks, onEdit, onDelete, onToggleCompleted}) => {
  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View style={styles.tasktext}>
        <CheckBox
          value={item.completed}
          onValueChange={() => onToggleCompleted(item.id)}
          style={styles.checkBox}
        />
        <Text style={[styles.task, item.completed && styles.completedTask]}>
          {item.text}
        </Text> 
      </View>
      <View style={styles.functions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(item.id)}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
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
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  },
});

export default DisplayTask;
