import React, {useState, useContext} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {TaskContext} from './context/TaskContext';

const availableTags = [
  'Personal Tasks',
  'Do',
  'Fiction',
  ' perido Street Station - China Mie`ville',
  'Reading',
  'The Encylopedia of warefare',
  'News & Artical',
  'Tech',
];

const InputComponent = () => {
  const {tasks, handleTasks, input, setInput, tags, setTags} =
    useContext(TaskContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleAddOrUpdateTask = () => {
    handleTasks();
  };

  const toggleTags = tag => {
    setTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <View>
            {!input && !isFocused && (
              <Text style={styles.placeholder}>Task ...</Text>
            )}
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={value => setInput(value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
          <View style={styles.tagsView}>
            {availableTags.map((tag, index) => (
              <Pressable key={index} style={[styles.tag, tags.includes(tag) && styles.includesTag]} onPress={() => toggleTags(tag)}>
                <Text style={styles.tagText}>{tag}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddOrUpdateTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 30,
    borderColor: '#ff1122',
    backgroundColor: '#0d0d05',
    paddingTop: 20,
    paddingBottom: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 50,
  },
  placeholder: {
    marginTop: 30,
    paddingLeft: 30,
    fontSize: 30,
    color: 'gray',
  },

  textInput: {
    height: 80,
    padding: 20,
    fontSize: 30,
    color: 'gray',
  },

  tagsView:{
    gap: 10,
    flexWrap:'wrap'
  },
  tag:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'gray',
    backgroundColor: 'lightGray',
    padding:5,
  },

  includesTag:{
    borderColor: '#ff5544'
  },
  tagText: {
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#ff5544',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default InputComponent;
