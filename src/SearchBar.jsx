import React, {useContext, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TaskContext} from './context/TaskContext';

const SearchBar = () => {
  const {searchQuery, setSearchQuery, isFocused, setIsFocused} =
    useContext(TaskContext);

  return (
    <View style={styles.searchContainer}>
      {isFocused ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onBlur={() => setIsFocused(false)}
          autoFocus
        />
      ) : (
        <Icon
          name="search"
          size={22}
          onPress={() => setIsFocused(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 20,
  },
});

export default SearchBar;
