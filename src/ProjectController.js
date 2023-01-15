import Project from "./Project";
import Storage from "./Storage";

//this class controls all Project objects
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

    initDefaultProjects() {
        //Home Project 
        const homeProject = new Project('Home Project')
        let test1 = Project.createToDo('Homework', 'Plz do homework', '2023-01-03', 'Low')
        let test2 = Project.createToDo('Hiking', 'Pilatus', '2023-08-03', 'High')
        homeProject.addToList(test1)
        homeProject.addToList(test2)

        //Today Project
        const todayProject = new Project('Today Project')
        let testToday1 = Project.createToDo('Today', 'It is today!!', '2023-01-03', 'Low')
        let testToday2 = Project.createToDo('Buy fish', 'Salmons', '2023-08-03', 'Medium')
        todayProject.addToList(testToday1)
        todayProject.addToList(testToday2)


        return {
            todayProject,
            homeProject,
        }
    }
}
