export default class Storage {
    
    static saveProject(project) {
        localStorage.setItem(project.id)
    }
    
}