import { ToDo } from "./ToDo";

export class TaskList {
    constructor() {
        this.toDoList = []
    }

    get getToDoList() {
        return this.toDoList
    }

    addToList(toDoObject) {
        this.toDoList.push(toDoObject)
    }

    removeFromList(id) {
        let toRemove = this.toDoList.find(toDo => toDo.id === id)
        this.toDoList.splice(this.toDoList.indexOf(toRemove), 1)
    }

}