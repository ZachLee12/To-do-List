import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import { ToDo } from './ToDo';
import Project from './Project';

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

    }

    function cancelButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
    }

})();

const projectController = (function () {
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

    //Controls the project that is currently active
    let currentProject = homeProject; //default
    const projectList = [homeProject,todayProject]

    function setCurrentProject() {
        
    }

    return {
        todayProject,
        homeProject,
        projectList,
        currentProject
    }
})();

const initializeNavTabs = (function () {
    DOMCache.homeTab.addEventListener('click', () => {
        renderProject(projectController.homeProject);
    })

    DOMCache.todayTab.addEventListener('click', () => {
        renderProject(projectController.todayProject);
    })

    function renderProject(project) {
        DisplayHandler.resetContentDisplay();
        DisplayHandler.renderAllToDo(project)
    }
})();






