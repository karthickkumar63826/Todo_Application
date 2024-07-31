import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import {TaskContext} from './context/TaskContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  const {isFocused} = useContext(TaskContext);

  return (
    <View>
      {!isFocused ? (
        <View style={styles.header}>
          <Icon name="menu" size={22} />
          <Text style={styles.text}>Today's reading list</Text>
          <Icon name="mic" size={22} />
          <SearchBar />
          <Icon name="more-vert" size={22} />
        </View>
      ) : (
        <SearchBar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: '700',
    paddingLeft: 5,
  },
});

export default Header;