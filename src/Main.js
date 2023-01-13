import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import { ToDo } from './ToDo';
import Project from './Project';
import ProjectController from './ProjectController';

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

const initalizeFormButtons = (function () {
    //Form Functions
    DOMCache.newTaskButton.addEventListener('click', newTaskButtonFunction)
    DOMCache.addButton.addEventListener('click', addButtonFunction)
    DOMCache.cancelButton.addEventListener('click', cancelButtonFunction)

    function newTaskButtonFunction() {
        DOMCache.taskForm.style.display = 'flex'
        DOMCache.newTaskButton.style.display = 'none'
    }

    function addButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
        let newToDo = new ToDo(DOMCache.title.value, DOMCache.description.value, DOMCache.dueDate.value, DOMCache.priority.value)
        projectController.getCurrentProject.addToList(newToDo)
        DisplayHandler.renderToDo(newToDo)
        
    }

    function cancelButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
    }

})();

//DEFAULTS
const projectController = new ProjectController(defaultProjects.homeProject)
projectController.addToProjectList(defaultProjects.homeProject)
projectController.addToProjectList(defaultProjects.todayProject)
DisplayHandler.renderAllToDo(projectController.getCurrentProject)

const initializeNavTabs = (function () {
    DOMCache.homeTab.addEventListener('click', () => {
        setCurrentProject(defaultProjects.homeProject)
        renderProject(defaultProjects.homeProject);
    })

    DOMCache.todayTab.addEventListener('click', () => {
        setCurrentProject(defaultProjects.todayProject)
        renderProject(defaultProjects.todayProject);
    })

    function renderProject(project) {
        DisplayHandler.resetContentDisplay();
        DisplayHandler.renderAllToDo(project)
    }

    function setCurrentProject(project) {
        projectController.setCurrentProject = project
    }
})();






