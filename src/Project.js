export default class Project {

    constructor(projectName) {
        this.projectName = projectName
        this.toDoList = []
    }

    get getToDoList() {
        return this.toDoList
    }

    get getProjectName() {
        return this.projectName
    }

    addToList(toDoObject) {
        this.toDoList.push(toDoObject)
    }

    removeFromList(id) {
        let toRemove = this.toDoList.find(toDo => toDo.id === id)
        this.toDoList.splice(this.toDoList.indexOf(toRemove), 1)
    }

}