import Realm from "realm";


class Task extends Realm.Object{}

Task.schema = {
    name: "Task",
    primaryKey : 'id',
    properties :{
        id: 'string',
        text: 'string',
        completed : 'bool'
    }
}


export default Task;