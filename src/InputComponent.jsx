import React, {useEffect, useState} from 'react';
import {Pressable, TextInput, View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import DisplayTask from './DisplayTasks';
import Realm from 'realm';
import TaskSchema from '../database/TaskSchema';

const InputComponent = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const realm = new Realm({schema: [TaskSchema.schema]});
    const tasks = realm.objects('Task');
    setTasks(tasks.map(task => ({...task})));

    return () => realm.close();
  }, []);

  const handleTasks = () => {
    if (input.trim()) {
      const realm = new Realm({schema: [TaskSchema.schema]});

      realm.write(() => {
        if (editingId) {
          const task = realm.objectForPrimaryKey('Task', editingId);
          task.text = input;
          setEditingId(null);
        } else {
          realm.create('Task', {
            id: Date.now().toString(),
            text: input,
            completed: false,
          });
        }
      });
      setTasks(realm.objects('Task').map(task => ({...task})));
      setInput('');
      realm.close();
    }
  };

  const handleEdit = id => {
    const realm = new Realm({schema: [TaskSchema.schema]});
    let taskToEdit = realm.objectForPrimaryKey('Task', id);
    setInput(taskToEdit.text);
    setEditingId(id);
    realm.close();
  };

  const handleDelete = id => {
    const realm = new Realm({schema: [TaskSchema.schema]});

    realm.write(() => {
      let task = realm.objectForPrimaryKey('Task', id);
      realm.delete(task);
    });

    setTasks(realm.objects('Task').map(task => ({...task})));
    realm.close();
  };

  const handleToggle = id => {
    const realm = new Realm({schema: [TaskSchema.schema]});

    realm.write(() => {
      let task = realm.objectForPrimaryKey('Task', id);
      task.completed = !task.completed;
    });

    setTasks(realm.objects('Task').map(task => ({...task})));
    realm.close();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your task ..."
          value={input}
          onChangeText={value => setInput(value)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleTasks}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        <DisplayTask
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleCompleted={handleToggle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
});

export default InputComponent;
