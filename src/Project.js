export default class Project {
    static projectId = 0;
    
    constructor(projectName) {
        this.projectId = Project.projectId
        this.projectName = projectName
        this.toDoList = []
        Project.projectId++;
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