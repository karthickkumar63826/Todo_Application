import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {TaskProvider} from './src/TaskContext';
import App from './App';
import {RealmProvider} from './src/RealmContext';
const Root = () => (
  <RealmProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </RealmProvider>
);

AppRegistry.registerComponent(appName, () => Root);
