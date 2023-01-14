import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import { ToDo } from './ToDo';
import Project from './Project';
import ProjectController from './ProjectController';
import Storage from './Storage';

//just dummy values to test localStorage
// localStorage.clear();
const defaultProjects = (function () {
    //Home Project 
    const homeProject = new Project('Home Project')
    let test1 = new ToDo('Homework', 'Plz do homework', '2023-01-03', 'Low')
    let test2 = new ToDo('Hiking', 'Pilatus', '2023-08-03', 'High')
    homeProject.addToList(test1)
    homeProject.addToList(test2)

    //Today Project
    const todayProject = new Project('Today Project')
    let testToday1 = new ToDo('Today', 'It is today!!', '2023-01-03', 'Low')
    let testToday2 = new ToDo('Buy fish', 'Salmons', '2023-08-03', 'Medium')
    todayProject.addToList(testToday1)
    todayProject.addToList(testToday2)


    return {
        todayProject,
        homeProject,
    }
})();
// localStorage.clear();
Storage.addProject(defaultProjects.homeProject)
Storage.addProject(defaultProjects.todayProject)

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
            initializeNavTabs.initialize(newLiElement, newProject)

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
        let newToDo = new ToDo(DOMCache.title.value, DOMCache.description.value, DOMCache.dueDate.value, DOMCache.priority.value)
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

//DEFAULTS
const projectController = new ProjectController()
DisplayHandler.renderLocalProjects(projectController)
// projectController.addToProjectList(defaultProjects.homeProject)
// projectController.addToProjectList(defaultProjects.todayProject)
// DisplayHandler.renderAllToDo(projectController.getCurrentProject)

const initializeNavTabs = (function () {
    //defaults
    DOMCache.homeTab.addEventListener('click', () => {
        setCurrentProject(defaultProjects.homeProject)
        renderProject(defaultProjects.homeProject);
    })

    DOMCache.todayTab.addEventListener('click', () => {
        setCurrentProject(defaultProjects.todayProject)
        renderProject(defaultProjects.todayProject);
    })

    function initialize(navElement, project) {
        navElement.addEventListener('click', () => {
            setCurrentProject(project)
            renderProject(project)
        })
    }

    function renderProject(project) {
        DisplayHandler.resetContentDisplay();
        DisplayHandler.renderAllToDo(project)
    }

    function setCurrentProject(project) {
        projectController.setCurrentProject = project
    }

    return {
        initialize
    }
})();







