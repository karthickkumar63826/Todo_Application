import React, { createContext, useState, useEffect } from 'react';
import { useRealm } from '../hooks/useRealm';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const realm = useRealm();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (realm) {
      const tasksCollection = realm.objects('Task');
      setTasks(tasksCollection.map(task => ({ ...task })));

      tasksCollection.addListener((collection, changes) => {
        const updatedTasks = collection.map(task => ({ ...task }));
        setTasks(updatedTasks);
      });

      return () => {
        if (realm && !realm.isClosed) {
          realm.close();
        }
      };
    }
  }, [realm]);

  const handleTasks = () => {
    if (realm && input.trim()) {
      try {
        realm.write(() => {
          if (editingId) {
            const task = realm.objectForPrimaryKey('Task', editingId);
            if (task) {
              task.text = input;
              task.tags = tags;
              setEditingId(null);
            }
          } else {
            realm.create('Task', {
              id: Date.now().toString(),
              text: input,
              completed: false,
              tags: tags,
            });
          }
        });

        const updatedTasks = realm.objects('Task').map(task => ({ ...task }));
        setTasks(updatedTasks);
        setInput('');
        setTags([]);
      } catch (error) {
        console.error('Error handling tasks:', error);
      }
    }
  };

  const handleEdit = id => {
    if (realm) {
      try {
        let taskToEdit = realm.objectForPrimaryKey('Task', id);
        if (taskToEdit) {
          setInput(taskToEdit.text);
          setTags(taskToEdit.tags);
          setEditingId(id);
        }
      } catch (error) {
        console.error('Error editing task:', error);
      }
    }
  };

  const handleDelete = id => {
    if (realm) {
      try {
        realm.write(() => {
          let task = realm.objectForPrimaryKey('Task', id);
          if (task) {
            realm.delete(task);
          }
        });

        const updatedTasks = realm.objects('Task').map(task => ({ ...task }));
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggle = id => {
    if (realm) {
      try {
        realm.write(() => {
          let task = realm.objectForPrimaryKey('Task', id);
          if (task) {
            task.completed = !task.completed;
          }
        });

        const updatedTasks = realm.objects('Task').map(task => ({ ...task }));
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error toggling task:', error);
      }
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
