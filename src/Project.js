import { ToDo } from './ToDo';

//this class controls all ToDo Objects in a List
//it has, however, a static method that allows instantiation of a ToDo
export default class Project {
    static id = 0;

    constructor(projectName) {
        this.id = Project.id
        this.projectName = projectName
        this.toDoList = []
        Project.id++;
    }

    get getToDoList() {
        return this.toDoList
    }

    get getProjectName() {
        return this.projectName
    }

    get getProjectId() {
        return this.id
    }

    set setTodoList(toDoList) {
        this.toDoList = toDoList
    }

    addToList(toDoObject) {
        this.toDoList.push(toDoObject)
    }

    removeFromList(id) {
        let toRemove = this.toDoList.find(toDo => toDo.id === id)
        this.toDoList.splice(this.toDoList.indexOf(toRemove), 1)
    }

    //a static method just for creating a ToDo
    static createToDo(title, description, dueDate, priority) {
        return new ToDo(title, description, dueDate, priority)
    }

}