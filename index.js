import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {TaskProvider} from './src/TaskContext';
import App from './App';
const Root = () => (
  <TaskProvider>
    <App />
  </TaskProvider>
);

AppRegistry.registerComponent(appName, () => Root);
