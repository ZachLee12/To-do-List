export default class Storage {
    
    static addProject(project) {
        localStorage.setItem(project.id, JSON.stringify(project))
    }

    static getProjectsArray() {
        let localProjects = []
        for (let key in Object.keys(localStorage)) {
            localProjects.push(JSON.parse(localStorage.getItem(key)))
        }
        return localProjects;
    }
    
}