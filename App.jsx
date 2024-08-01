import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './src/Header';
import DisplayTask from './src/DisplayTasks';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import AddTask from './src/AddTask';
import MyCalendar from './src/CalenderComponent';
import {
  ModalSlideFromBottomIOS,
  SlideFromRightIOS,
} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import AddTag from './src/AddTag';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          cardStyle: {backgroundColor: '#0d0d05'},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Input"
          component={AddTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Calendar"
          component={MyCalendar}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="AddTag"
          component={AddTag}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Input');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header />
        <DisplayTask />
        <Pressable style={styles.addTask} onPress={handlePress}>
          <Icon name="add" size={24} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 30,
    borderColor: '#ff1122',
    backgroundColor: '#0d0d05',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  addTask: {
    width: 50,
    height: 50,
    backgroundColor: '#ff5544',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  icon: {
    color: '#000',
  },
});

export default App;
