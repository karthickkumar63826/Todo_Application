import React, {createContext, useState, useEffect} from 'react';
import Realm from 'realm';
import TaskSchema from '../../database/TaskSchema';

export const TaskContext = createContext();

let realm;

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const openRealm = async () => {
      try {
        realm = await Realm.open({
          schema: [TaskSchema],
          schemaVersion: 3, 
          migration: (oldRealm, newRealm) => {
            console.log(
              'Running migration from schema version',
              oldRealm.schemaVersion,
              'to',
              newRealm.schemaVersion,
            );
            if (oldRealm.schemaVersion < 3) {
              const oldObjects = oldRealm.objects('Task');
              const newObjects = newRealm.objects('Task');

              console.log('Migrating tasks...');
              for (let i = 0; i < oldObjects.length; i++) {
                const oldObject = oldObjects[i];
                const newObject = newObjects[i];
                newObject.tags = oldObject.tags || [];
              }
            }
          },
        });

        const tasks = realm.objects('Task');
        console.log('Fetched tasks:', tasks);
        setTasks(tasks.map(task => ({...task})));

        tasks.addListener((collection, changes) => {
          const updatedTasks = collection.map(task => ({...task}));
          setTasks(updatedTasks);
        });
      } catch (error) {
        console.error('Error opening Realm:', error);
      }
    };

    openRealm();

    return () => {
      if (realm && !realm.isClosed) {
        console.log('Closing Realm');
        realm.close();
      }
    };
  }, []);

  const handleTasks = () => {
    if (input.trim()) {
      console.log('Handling tasks with input:', input);

      try {
        realm.write(() => {
          if (editingId) {
            console.log('Editing task with id:', editingId);
            const task = realm.objectForPrimaryKey('Task', editingId);
            console.log(task);
            if (task) {
              task.text = input;
              task.tags = tags;
              setEditingId(null);
            } else {
              console.warn('Task with id', editingId, 'not found.');
            }
          } else {
            console.log('Creating new task');
            realm.create('Task', {
              id: Date.now().toString(),
              text: input,
              completed: false,
              tags: tags,
            });
          }
        });

        const updatedTasks = realm.objects('Task').map(task => ({...task}));
        console.log('Updated tasks:', updatedTasks);
        setTasks(updatedTasks);
        setInput('');
        setTags([]);
      } catch (error) {
        console.error('Error handling tasks:', error);
      }
    }
  };

  const handleEdit = id => {
    console.log('Editing task with id:', id);

    try {
      let taskToEdit = realm.objectForPrimaryKey('Task', id);
      if (taskToEdit) {
        setInput(taskToEdit.text);
        setTags(taskToEdit.tags);
        setEditingId(id);
      } else {
        console.warn('Task with id', id, 'not found.');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDelete = id => {
    console.log('Deleting task with id:', id);

    try {
      realm.write(() => {
        let task = realm.objectForPrimaryKey('Task', id);
        if (task) {
          realm.delete(task);
        } else {
          console.warn('Task with id', id, 'not found.');
        }
      });

      const updatedTasks = realm.objects('Task').map(task => ({...task}));
      console.log('Tasks after deletion:', updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggle = id => {
    console.log('Toggling task with id:', id);

    try {
      realm.write(() => {
        let task = realm.objectForPrimaryKey('Task', id);
        if (task) {
          task.completed = !task.completed;
        } else {
          console.warn('Task with id', id, 'not found.');
        }
      });

      const updatedTasks = realm.objects('Task').map(task => ({...task}));
      console.log('Tasks after toggle:', updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchQuery,
        setSearchQuery,
        handleTasks,
        handleEdit,
        handleDelete,
        handleToggle,
        isFocused,
        setIsFocused,
        input,
        setInput,
        editingId,
        setEditingId,
        tags,
        setTags,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
