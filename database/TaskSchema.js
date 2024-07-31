import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    text: 'string',
    completed: 'bool',
    tags: 'string[]',
  },
};

export default TaskSchema;
