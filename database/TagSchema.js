import Realm from 'realm';

const TagSchema = {
  name: 'Tags',
  primaryKey: 'id',
  properties: {
    id: 'string',
    tag: 'string',
    selected: 'bool',
  },
};



export default TagSchema;
