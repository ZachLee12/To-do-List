import './assets/styles/reset.css'
import './assets/styles/style.css'
import LightBulb from './assets/images/light-bulb-color.png'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import Project from './Project';
import ProjectController from './ProjectController';

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

    //Limit Date input to only from 'Today' onwards
    var today = new Date().toISOString().split('T')[0];
    DOMCache.dueDate.setAttribute('min', today)

    function newProjectFunction() {
        DOMCache.projectForm.style.display = 'block'
        DOMCache.newProjectButton.style.display = 'none'
    }

    function addProjectFunction() {
        if (!DOMCache.projectForm.reportValidity()) {
            return
        }
        let hasSameName = false;
        projectController.getProjectList.forEach(project => {
            if (project.getProjectName === DOMCache.projectName.value) {
                hasSameName = true;
            }
        })
        if (hasSameName) {
            DOMCache.sameNameErrorMessage.style.display = 'block'
            setTimeout(() => {
                DOMCache.sameNameErrorMessage.style.display = 'none'
            }, 1500)

            return
        }

        DOMCache.projectForm.validity = true;
        DOMCache.projectForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'none'
        DOMCache.newProjectButton.style.display = 'block'
        let newProject = new Project(DOMCache.projectName.value)
        let newLiElement = DisplayHandler.renderNewProjectLiElement(newProject, projectController).children[0];
        DisplayHandler.initNavElement(newLiElement, newProject, projectController)
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

const initializeNavTabs = (function () {
    DisplayHandler.defaultNavTabList.forEach((navTabs) => {
        navTabs.addEventListener('click', (event) => {
            DisplayHandler.divWrapperElementList.forEach((wrapper) => {
                wrapper.classList.remove('li-active-color');
            })
            DisplayHandler.defaultNavTabList.forEach((tabs) => {
                tabs.classList.remove('li-active-color');
            })
            navTabs.classList.add('li-active-color');
        })
    })
})();

const initializeLearnMoreModal = (function () {
    DOMCache.closeLearnMoreButton.addEventListener('click', () => {
        DOMCache.learnMoreModal.style.display = 'none'
    })

    DOMCache.learnMoreImageButton.addEventListener('click', () => {
        DOMCache.learnMoreModal.style.display = 'block'
    })
})();





