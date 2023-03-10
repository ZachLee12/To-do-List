//DOMCache caches all DOM elements needed. Access to the DOM should only be performed here.
export default class DOMCache {
    constructor() {
        throw new Error('Cannot instantiated static class DOMCache')
    }
    
    //main content to render all ToDos
    static mainContent = document.getElementById('content')

    //buttons
    static newTaskButton = document.getElementById('new-task-button')
    static taskForm = document.getElementById('task-form')
    static addButton = document.getElementById('add-button')
    static cancelButton = document.getElementById('cancel-button')
    static newProjectButton = document.getElementById('new-project-button')
    static addProjectButton = document.getElementById('add-project')
    static cancelProjectButton = document.getElementById('cancel-project')

    //learn-more modal elements
    static learnMoreImageButton = document.getElementById('learn-more')
    static learnMoreModal = document.querySelector('.learn-more-modal')
    static closeLearnMoreButton = document.getElementById('close-learn-more-button')

    //add project form input
    static projectName = document.getElementById('project-name')
    static projectForm = document.getElementById('new-project-form')
    static sameNameErrorMessage = document.querySelector('.same-name-error-message')

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