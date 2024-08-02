import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    text: 'string',
    completed: 'bool',
    tags: {type: 'list', objectType: 'Tags'},
  },
};

export default TaskSchema;
