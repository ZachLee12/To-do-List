import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import Project from './Project';
import ProjectController from './ProjectController';
import DefaultTabs from './DefaultTabs';

//just dummy values to test localStorage
// localStorage.clear();
//DEFAULTS
const projectController = new ProjectController()
DisplayHandler.renderLocalProjects(projectController)
const defaultProjects = DefaultTabs.initDefaultProjects();
const initalizeFormButtons = (function () {
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
        if (DOMCache.projectForm.reportValidity()) {

            DOMCache.projectForm.style.display = 'none'
            DOMCache.newProjectButton.style.display = 'block'
            let newProject = new Project(DOMCache.projectName.value)
            let newLiElement = DisplayHandler.renderNewProjectLiElement(newProject, projectController);
            DisplayHandler.initNavElement(newLiElement, newProject, projectController)

            //remember to add the project to the list of projects!!
            projectController.addToProjectList(newProject)
            projectController.addProjectToStorage(newProject)
        }
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
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
        let newToDo = Project.createToDo(DOMCache.title.value, DOMCache.description.value, DOMCache.dueDate.value, DOMCache.priority.value)
        DisplayHandler.renderToDo(newToDo, projectController.getCurrentProject)
        //remember to add it to the ToDo list!!
        projectController.getCurrentProject.addToList(newToDo)
        projectController.addProjectToStorage(projectController.getCurrentProject)

    }

    function cancelButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
    }

})();

const initializeNavTabs = (function () {
    //defaults
    DOMCache.homeTab.addEventListener('click', () => {
        // setCurrentProject(defaultProjects.homeProject)
        // renderProject(defaultProjects.homeProject);
    })

    DOMCache.todayTab.addEventListener('click', () => {
        // setCurrentProject(defaultProjects.todayProject)
        // renderProject(defaultProjects.todayProject);
    })
})();







