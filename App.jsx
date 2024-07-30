import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import InputComponent from './src/InputComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Todo Application</Text>
      <InputComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
});

export default App;
