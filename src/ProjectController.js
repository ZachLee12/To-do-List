import Project from "./Project";

export default class ProjectController {
    constructor(currentProject) {
        this.currentProject = currentProject
        this.projectList = []
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

    addToProjectList(project) {
        this.projectList.push(project)
    }

    removeFromProjectList(id) {
        let toRemove = this.projectList.find(project => project.id === id)
        this.projectList.splice(this.projectList.indexOf(toRemove), 1)
    }
}
