import DOMCache from './DOMCache'
import BinImage from './assets/images/bin.png'

export default class DisplayHandler {

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
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'

        let toDoDiv = document.createElement('div')
        toDoDiv.className = 'to-do'
        toDoDiv.id = toDoObject.id

        let leftDiv = document.createElement('div')
        let objectTitleSpan = document.createElement('span')
        objectTitleSpan.innerHTML = toDoObject.title
        let detailsButton = document.createElement('button')
        detailsButton.textContent = 'Details'
        detailsButton.addEventListener('click', (e) => {
            //complex selector, as the Details Modal has display of 'none'
            //a normal document.querySelector() would not work.
            e.target.nextElementSibling.style.display = 'block'
        })

        leftDiv.append(checkbox, objectTitleSpan, detailsButton, this.createModal(toDoObject))

        let rightDiv = document.createElement('div')
        let objectDueDateSpan = document.createElement('span')
        objectDueDateSpan.innerHTML = toDoObject.dueDate
        let prioritySpan = document.createElement('span')
        prioritySpan.innerHTML = toDoObject.priority
        let binImage = new Image();
        binImage.id = toDoObject.id
        binImage.src = BinImage

        rightDiv.append(objectDueDateSpan, prioritySpan, binImage)

        toDoDiv.append(leftDiv, rightDiv)

        checkbox.addEventListener('change', (e) => {
            e.target.checked
                ? toDoDiv.classList.add('strike-through')
                : toDoDiv.classList.remove('strike-through')
        })

        binImage.addEventListener('click', (e) => {
            toDoDiv.remove();
            project.removeFromList(toDoObject.id)
            projectController.addProjectToStorage(projectController.getCurrentProject)
            
        })

        return toDoDiv
    }

    static createModal(toDoObject) {
        //Description Modal
        let modalWrapper = document.createElement('div')
        modalWrapper.className = 'modal-wrapper'
        modalWrapper.id = toDoObject.id
        let modalContent = document.createElement('div')
        modalContent.className = 'modal-content'
        modalContent.textContent = toDoObject.description
        let closeButton = document.createElement('button')
        closeButton.innerText = 'Close'
        closeButton.addEventListener('click', () => {
            modalWrapper.style.display = 'none'
        })

        modalContent.append(closeButton)
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
            let newLiElement = this.renderNewProjectLiElement(project, projectController)

            //initialize element event listener
            newLiElement.addEventListener('click', () => {
                projectController.setCurrentProject = project
                this.resetContentDisplay();
                this.renderAllToDo(project, projectController);
            })
        })
    }

    static renderNewProjectLiElement(project, projectController) {
        let newLi = this.createProjectLiElement(project, projectController)
        DOMCache.uLElementProjectList.append(newLi)
        this.resetAddProjectFormValues()
        return newLi;
    }

    static createProjectLiElement(project, projectController) {
        let li = document.createElement('li')
        li.innerHTML = project.getProjectName
        li.id = project.getProjectId
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'X'
        deleteButton.addEventListener('click', () => {
            li.remove();
            projectController.removeFromProjectList(project.id)
            projectController.removeFromStorageList(project)
            // console.log(projectController.getProjectList)
        })
        li.append(deleteButton)
        return li
    }

    static resetAddProjectFormValues() {
        DOMCache.projectName.value = ''
    }
}