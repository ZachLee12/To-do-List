//static class, so no constructor()
export default class DOMCache {

    static mainContent = document.getElementById('content')
    static newTaskButton = document.getElementById('new-task-button')
    static taskForm = document.getElementById('task-form')
    static addButton = document.getElementById('add-button')
    static cancelButton = document.getElementById('cancel-button')

    //form inputs
    static title = document.getElementById('title')
    static description = document.getElementById('description')
    static dueDate = document.getElementById('due-date')
    static priority = document.getElementById('priority')

    //nav tabs
    static homeTab = document.getElementById('home')
    static todayTab = document.getElementById('today')
    static nextWeekTab = document.getElementById('next-week')

}