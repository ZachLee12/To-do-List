export default class Storage {
    constructor() {
        throw new Error('Cannot instantiate static class Storage')
    }

    static addProject(project) {
        localStorage.setItem(project.projectName, JSON.stringify(project))
    }

    static removeProject(project) {
        localStorage.removeItem(project.getProjectName)
    }

    static getProjectsArray() {
        let localProjects = []
        for (let keyValuePair of Object.entries(localStorage)) {
            let key = keyValuePair[0] //projectName, the key of the value
            let object = JSON.parse(localStorage.getItem(key))
            localProjects.push(object)
        }
        return localProjects;
    }


}