import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import Project from './Project';
import ProjectController from './ProjectController';

//just dummy values to test localStorage
// localStorage.clear();

//DEFAULTS
const projectController = new ProjectController()
DisplayHandler.renderLocalProjects(projectController)
DisplayHandler.renderHome(projectController)
DisplayHandler.initHomeElement(DOMCache.homeTab, projectController)
DisplayHandler.initTodayElement(DOMCache.todayTab, projectController)
DisplayHandler.initThisWeekElement(DOMCache.thisWeekTab, projectController)

const initalizeFormButtons = (function () {
    //Home and Today Tab Function
    DOMCache.homeTab.addEventListener('click', hideTaskFunctions)
    DOMCache.todayTab.addEventListener('click', hideTaskFunctions)
    DOMCache.thisWeekTab.addEventListener('click', hideTaskFunctions)

    //Add New Project Form functions
    DOMCache.addProjectButton.addEventListener('click', addProjectFunction)
    DOMCache.newProjectButton.addEventListener('click', newProjectFunction)
    DOMCache.cancelProjectButton.addEventListener('click', cancelProjectFunction)

    //Task Form Functions
    DOMCache.newTaskButton.addEventListener('click', newTaskButtonFunction)
    DOMCache.addButton.addEventListener('click', addButtonFunction)
    DOMCache.cancelButton.addEventListener('click', cancelButtonFunction)

    function newProjectFunction() {
        DOMCache.projectForm.style.display = 'block'
        DOMCache.newProjectButton.style.display = 'none'
    }

    function addProjectFunction() {
        if (!DOMCache.projectForm.reportValidity()) {
            return
        }

        DOMCache.projectForm.style.display = 'none'
        DOMCache.newProjectButton.style.display = 'block'
        let newProject = new Project(DOMCache.projectName.value)
        let newLiElement = DisplayHandler.renderNewProjectLiElement(newProject, projectController);
        DisplayHandler.initNavElement(newLiElement, newProject, projectController)

        //remember to add the project to the list of projects!!
        projectController.addToProjectList(newProject)
        projectController.addProjectToStorage(newProject)

    }

    function cancelProjectFunction() {
        DOMCache.projectForm.style.display = 'none'
        DOMCache.newProjectButton.style.display = 'block'
    }

    function newTaskButtonFunction() {
        DOMCache.taskForm.style.display = 'flex'
        DOMCache.newTaskButton.style.display = 'none'
    }

    function addButtonFunction() {
        if (!DOMCache.taskForm.reportValidity()) {
            return
        }

        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
        let newToDo = Project.createToDo(DOMCache.title.value, DOMCache.description.value, DOMCache.dueDate.value, DOMCache.priority.value)
        DisplayHandler.renderToDo(newToDo, projectController.getCurrentProject, projectController)
        //remember to add it to the ToDo list!!
        projectController.getCurrentProject.addToList(newToDo)
        projectController.addProjectToStorage(projectController.getCurrentProject)
        console.log(newToDo)
    }

    function cancelButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block';
    }

    function hideTaskFunctions() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'none';
    }

})();







