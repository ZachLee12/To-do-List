import DOMCache from './DOMCache'
import BinImage from './assets/images/bin.png'
import CrossImage from './assets/images/cross.png'
import CrossActiveImage from './assets/images/cross-active.png'
import { format } from 'date-fns';

export default class DisplayHandler {
    constructor() {
        throw new Error('Cannot instantiate static class DisplayHandler')
    }
    static defaultNavTabList = [DOMCache.homeTab, DOMCache.todayTab, DOMCache.thisWeekTab]
    static divWrapperElementList = []

    static initHomeElement(homeElement, projectController) {
        homeElement.addEventListener('click', () => {
            this.resetContentDisplay();
            this.renderHome(projectController)
        })
    }

    static renderHome(projectController) {
        projectController.getProjectList.forEach(project => {
            this.renderAllToDo(project, projectController)
        })
    }

    static initTodayElement(todayElement, projectController) {
        todayElement.addEventListener('click', () => {
            this.resetContentDisplay();
            this.renderToday(projectController)
        })
    }

    static renderToday(projectController) {
        let today = format(new Date(), 'yyyy-MM-dd');
        projectController.getProjectList.forEach(project => {
            project.getToDoList.forEach(toDo => {
                if (toDo.dueDate === today) {
                    this.renderToDo(toDo, project, projectController);
                }
            })
        })
    }

    static initThisWeekElement(thisWeekElement, projectController) {
        thisWeekElement.addEventListener('click', () => {
            this.resetContentDisplay();
            this.renderThisWeek(projectController)
        })
    }

    static renderThisWeek(projectController) {
        let oneWeekMillisecond = 7 * 24 * 60 * 60 * 1000; // for 7 days in milliseconds
        let today = new Date();

        let todayTime = today.getTime();
        projectController.getProjectList.forEach(project => {
            project.getToDoList.forEach(toDo => {
                let input = new Date(toDo.dueDate)
                let inputTime = input.getTime();
                if (Math.abs(inputTime - todayTime) < oneWeekMillisecond) {
                    this.renderToDo(toDo, project, projectController);
                }
            })
        })
    }

    static initNavElement(navElement, project, projectController) {
        navElement.addEventListener('click', () => {
            projectController.setCurrentProject = project
            DOMCache.newTaskButton.style.display = 'block';
            this.resetContentDisplay();
            this.renderAllToDo(project, projectController)
        })
    }

    static renderAllToDo(project, projectController) {
        project.getToDoList.forEach((toDo) => {
            this.renderToDo(toDo, project, projectController)
        })
    }

    //renders a 'toDoObject' on the webpage
    static renderToDo(toDoObject, project, projectController) {
        let newToDoDiv = this.createToDoHTMLDiv(toDoObject, project, projectController)
        DOMCache.mainContent.append(newToDoDiv)
        this.resetFormValues()
    }

    //creates a div for a toDoObject, with all the input functions set
    static createToDoHTMLDiv(toDoObject, project, projectController) {
        let toDoDiv = document.createElement('div')
        toDoDiv.className = 'to-do'
        toDoDiv.id = toDoObject.id

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        if (toDoObject.toDoFinished) {
            checkbox.checked = true;
            toDoDiv.classList.add('strike-through')

        } else {
            checkbox.checked = false;
            toDoDiv.classList.remove('strike-through')
        }

        let leftDiv = document.createElement('div')
        leftDiv.className = 'left-div'

        //TITLE
        let objectTitleSpan = document.createElement('span')
        objectTitleSpan.innerHTML = toDoObject.title
        let editToDoTitle = document.createElement('input')
        editToDoTitle.className = 'edit-to-do-title'
        editToDoTitle.type = 'text'
        editToDoTitle.value = toDoObject.title
        editToDoTitle.style.display = 'none'
        editToDoTitle.addEventListener('change', () => {
            if (editToDoTitle.value === "") {
                editToDoTitle.value = 'No Title'
            }
            objectTitleSpan.innerHTML = editToDoTitle.value
            toDoObject.title = editToDoTitle.value
            projectController.addProjectToStorage(project)
            editToDoTitle.style.display = 'none'
            objectTitleSpan.append(editToDoTitle)
        })
        objectTitleSpan.addEventListener('click', () => {
            objectTitleSpan.innerText = ''
            objectTitleSpan.append(editToDoTitle)
            editDueDateInput.style.display = 'none'
            editToDoTitle.style.display = 'block'
            activatePriorityMenu.style.display = 'none'
            editToDoTitle.select();
        })
        objectTitleSpan.append(editToDoTitle)

        let detailsButton = document.createElement('button')
        detailsButton.className = 'details-button'
        detailsButton.textContent = 'Details'
        detailsButton.addEventListener('click', (e) => {
            //complex selector, as the Details Modal has display of 'none'
            //a normal document.querySelector() would not work.
            e.target.nextElementSibling.style.display = 'block'

        })

        leftDiv.append(checkbox, objectTitleSpan, detailsButton, this.createModal(project, toDoObject, projectController))

        let rightDiv = document.createElement('div')
        rightDiv.className = 'right-div'

        //DUE DATE
        let objectDueDateSpan = document.createElement('span')
        let dueDateObject = new Date(Date.parse(toDoObject.dueDate))
        objectDueDateSpan.innerHTML = format(dueDateObject, 'dd-MMM-yyyy')
        let editDueDateInput = document.createElement('input')
        editDueDateInput.type = 'date'
        editDueDateInput.className = 'edit-due-date'
        editDueDateInput.value = toDoObject.dueDate
        editDueDateInput.style.display = 'none'
        editDueDateInput.addEventListener('change', (e) => {
            editDueDateInput.style.display = 'none'
            let editDueDateObject = new Date(Date.parse(editDueDateInput.value))
            objectDueDateSpan.innerHTML = format(editDueDateObject, 'dd-MMM-yyyy')
            toDoObject.dueDate = editDueDateInput.value
            projectController.addProjectToStorage(project)
            //this is a little clumsy, find a better way in the future
            objectDueDateSpan.append(editDueDateInput) // append again, because previous line deletes this editInput
        })
        objectDueDateSpan.addEventListener('click', () => {
            if (editDueDateInput.style.display === 'block') {
                editDueDateInput.style.display = 'none'
            } else {
                editDueDateInput.style.display = 'block'
            }
            editToDoTitle.style.display = 'none'
            objectTitleSpan.innerText = editToDoTitle.value
            activatePriorityMenu.style.display = 'none'
        })
        objectDueDateSpan.append(editDueDateInput)

        //PRIORITY
        let prioritySpan = document.createElement('span')
        prioritySpan.innerHTML = toDoObject.priority
        prioritySpan.className = 'priority-span'

        let activatePriorityMenu = document.createElement('div')
        activatePriorityMenu.className = 'activate-priority-menu'
        let changePriorityText = document.createElement('p')
        changePriorityText.className = 'change-priority-text'
        changePriorityText.innerText = 'Change Priority'
        activatePriorityMenu.appendChild(changePriorityText)
        prioritySpan.append(activatePriorityMenu);

        let priorityOptions = ['No Priority', 'Low', 'Medium', 'High']
        let optionElements = []
        priorityOptions.forEach((option, index) => {
            let div = document.createElement('div')
            div.innerText = option
            div.className = 'priority-option'
            activatePriorityMenu.append(div)
            optionElements.push(div)
        })

        optionElements.forEach(element => {
            element.addEventListener('click', () => {
                toDoObject.priority = element.innerText;
                prioritySpan.innerText = element.innerText;
                prioritySpan.append(activatePriorityMenu)
                projectController.addProjectToStorage(project)
            })
        })

        prioritySpan.addEventListener('click', () => {
            if (activatePriorityMenu.style.display === 'block') {
                activatePriorityMenu.style.display = 'none'
            } else {
                activatePriorityMenu.style.display = 'block'
            }

            editToDoTitle.style.display = 'none'
            objectTitleSpan.innerText = editToDoTitle.value
            editDueDateInput.style.display = 'none'
        })

        let binImage = new Image();
        binImage.id = toDoObject.id
        binImage.src = BinImage

        rightDiv.append(objectDueDateSpan, prioritySpan, binImage)
        toDoDiv.append(leftDiv, rightDiv)

        checkbox.addEventListener('click', (e) => {
            if (e.target.checked) {
                toDoDiv.classList.add('strike-through')
                toDoObject.toDoFinished = true;
            } else {
                toDoDiv.classList.remove('strike-through')
                toDoObject.toDoFinished = false;
            }
            console.log(e.target.checked)
            projectController.addProjectToStorage(project)
        })

        binImage.addEventListener('click', (e) => {
            toDoDiv.remove();
            project.removeFromList(toDoObject.id)
            projectController.addProjectToStorage(project)
        })

        return toDoDiv
    }

    static createModal(project, toDoObject, projectController) {
        //Description Modal
        let modalWrapper = document.createElement('div')
        modalWrapper.className = 'modal-wrapper'
        modalWrapper.id = toDoObject.id
        let modalContent = document.createElement('div')
        modalContent.className = 'modal-content'
        modalContent.textContent = toDoObject.description

        let editDescription = document.createElement('textarea')
        editDescription.className = 'edit-description'
        editDescription.value = toDoObject.description;
        editDescription.style.display = 'none'
        let closeButton = document.createElement('button')
        closeButton.innerText = 'Close'
        closeButton.className = 'close-modal-button'
        closeButton.addEventListener('click', () => {
            modalWrapper.style.display = 'none'
            editDescription.style.display = 'none'
            editButton.innerText = 'Edit'
            modalContent.textContent = editDescription.value;
            modalContent.append(editDescription, editButton, closeButton)
            toDoObject.description = editDescription.value;
            projectController.addProjectToStorage(project)
        })

        let editButton = document.createElement('button')
        editButton.innerText = 'Edit'
        editButton.className = 'edit-description-button'
        let buttonsWrapper = document.createElement('div')
        buttonsWrapper.className = 'description-buttons-wrapper'
        buttonsWrapper.append(editButton, closeButton)
        editButton.addEventListener('click', () => {
            if (editDescription.style.display === 'block') {
                editDescription.style.display = 'none'
                editButton.innerText = 'Edit'
                modalContent.textContent = editDescription.value;
                toDoObject.description = editDescription.value;
                console.log(toDoObject)
                modalContent.append(editDescription, buttonsWrapper)
                projectController.addProjectToStorage(project)
            } else {
                editDescription.style.display = 'block'
                editButton.innerText = 'Save Edit'
                modalContent.append(editDescription, buttonsWrapper)
            }
        })

        modalContent.append(editDescription, buttonsWrapper)
        modalWrapper.append(modalContent)

        return modalWrapper
    }

    static resetFormValues() {
        DOMCache.title.value = ""
        DOMCache.description.value = ""
        DOMCache.dueDate.value = ""
        DOMCache.priority.selectedIndex = 0;
    }

    static resetContentDisplay() {
        DOMCache.mainContent.innerHTML = ''
    }

    static renderLocalProjects(projectController) {
        projectController.getProjectList.forEach(project => {
            let newLiElement = this.renderNewProjectLiElement(project, projectController).children[0]
            console.log(newLiElement)
            //initialize element event listener
            this.initNavElement(newLiElement, project, projectController)
        })
    }

    static renderNewProjectLiElement(project, projectController) {
        let newLi = this.createProjectLiElement(project, projectController)
        DOMCache.uLElementProjectList.append(newLi)
        this.resetAddProjectFormValues()
        return newLi;
    }

    static createProjectLiElement(project, projectController) {
        let divWrapper = document.createElement('div')
        divWrapper.className = 'nav-li-element-wrapper'
        let li = document.createElement('li')
        li.innerHTML = project.getProjectName
        li.id = project.getProjectId
        li.className = 'nav-li-element'
        divWrapper.append(li)
        let deleteButton = document.createElement('img')
        deleteButton.src = CrossImage
        deleteButton.className = 'delete-project'
        deleteButton.style.visibility = 'hidden'
        divWrapper.append(deleteButton)
        deleteButton.addEventListener('click', () => {
            li.remove();
            projectController.removeFromProjectList(project.id)
            projectController.removeFromStorageList(project)
            DOMCache.newTaskButton.style.display = 'none'
            if (project === projectController.getCurrentProject) {
                DOMCache.mainContent.innerHTML = ''
            }
            console.log(project)
            console.log(projectController.getCurrentProject)
        })

        deleteButton.addEventListener('mouseover', () => {
            deleteButton.src = CrossActiveImage
        })

        deleteButton.addEventListener('mouseout', () => {
            deleteButton.src = CrossImage
        })

        divWrapper.addEventListener('click', () => {
            this.defaultNavTabList.forEach((element) => {
                element.classList.remove('li-active-color')
            })
            this.divWrapperElementList.forEach((element) => {
                element.classList.remove('li-active-color')
            })
            divWrapper.classList.add('li-active-color')
        })

        divWrapper.addEventListener('mouseover', () => {
            deleteButton.style.visibility = 'visible'
            deleteButton.style.opacity = 1;
        })
        divWrapper.addEventListener('mouseout', () => {
            deleteButton.style.visibility = 'hidden'
            deleteButton.style.opacity = 0;
        })

        this.divWrapperElementList.push(divWrapper)
        return divWrapper
    }

    static resetAddProjectFormValues() {
        DOMCache.projectName.value = ''
    }
}