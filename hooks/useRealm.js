
import { useEffect, useState } from 'react';
import Realm from 'realm';
import TagSchema from '../database/TagSchema';
import TaskSchema from '../database/TaskSchema';

const realmConfig = {
  schema: [TagSchema, TaskSchema],
  schemaVersion: 10,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 10) {
      const oldObjects = oldRealm.objects('Task');
      const newObjects = newRealm.objects('Task');

      for (let i = 0; i < oldObjects.length; i++) {
        const oldObject = oldObjects[i];
        const newObject = newObjects[i];
        newObject.date = oldObject.date || [];
      }
    }
  },
};

let realmInstance = null;

export const useRealm = () => {
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (!realmInstance) {
      realmInstance = new Realm(realmConfig);
    }
    setRealm(realmInstance);

    return () => {
    };
  }, []);

  return realm;
};
