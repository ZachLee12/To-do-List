//static class, so no constructor()
export default class DOMCache {
    constructor() {
        throw new Error('Cannot instantiated static class DOMCache')
    }

    static mainContent = document.getElementById('content')
    static newTaskButton = document.getElementById('new-task-button')
    static taskForm = document.getElementById('task-form')
    static addButton = document.getElementById('add-button')
    static cancelButton = document.getElementById('cancel-button')
    static newProjectButton = document.getElementById('new-project-button')
    static addProjectButton = document.getElementById('add-project')
    static cancelProjectButton = document.getElementById('cancel-project')

    //add project form input
    static projectName = document.getElementById('project-name')
    static projectForm = document.getElementById('new-project-form')

    //task form inputs
    static title = document.getElementById('title')
    static description = document.getElementById('description')
    static dueDate = document.getElementById('due-date')
    static priority = document.getElementById('priority')

    //nav tabs
    static uLElementProjectList = document.getElementById('project-list')
    static homeTab = document.getElementById('home')
    static todayTab = document.getElementById('today')
    static thisWeekTab = document.getElementById('this-week')

    //access a custom element
    static queryElement = function (query) {
        return document.querySelector(query)
    }

}