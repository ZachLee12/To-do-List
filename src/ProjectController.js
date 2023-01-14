import Project from "./Project"; 
import Storage from "./Storage";

export default class ProjectController {
    constructor() {
        this.projectList = []
        this.currentProject = null
        this.storageList = Storage.getProjectsArray();
        this.storageList.forEach(object => {
            let newProject = new Project(object.projectName)
            newProject.setTodoList = object.toDoList
            this.projectList.push(newProject)
        })
    
        console.log(this.storageList)
        console.log(this.projectList)
        console.log(Storage.getProjectsArray());
    }

    get getCurrentProject() {
        return this.currentProject
    }

    set setCurrentProject(project) {
        this.currentProject = project
    }

    get getProjectList() {
        return this.projectList
    }

    addProjectToStorage(project) {
        Storage.addProject(project)
    }

    addToProjectList(project) {
        this.projectList.push(project)
    }

    removeFromProjectList(id) {
        let toRemove = this.projectList.find(project => project.id === id)
        this.projectList.splice(this.projectList.indexOf(toRemove), 1)
    }

    removeFromStorageList(project) {
        Storage.removeProject(project)
    }
}
