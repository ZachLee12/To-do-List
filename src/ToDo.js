export class ToDo {
    static instanceId = 0;

    constructor(title, description, dueDate, priority, toDoFinished = false) {
        this.id = ToDo.instanceId
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.toDoFinished = toDoFinished;
        ToDo.instanceId++;
    }   

}

