import { useEffect, useState } from 'react';
import Realm from 'realm';
import TagSchema from '../database/TagSchema';
import TaskSchema from '../database/TaskSchema';

const realmConfig = {
  schema: [TagSchema, TaskSchema],
  schemaVersion: 5,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 5) {
      const oldObjects = oldRealm.objects('Task');
      const newObjects = newRealm.objects('Task');

      for (let i = 0; i < oldObjects.length; i++) {
        const oldObject = oldObjects[i];
        const newObject = newObjects[i];
        newObject.tags = oldObject.tags || [];
      }
    }
  },
};

export const useRealm = () => {
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    const realmInstance = new Realm(realmConfig);
    setRealm(realmInstance);

    return () => {
      if (realmInstance && !realmInstance.isClosed) {
        realmInstance.close();
      }
    };
  }, []);

  return realm;
};
