import DOMCache from './DOMCache'
import BinImage from './assets/images/bin.png'
export default class DisplayHandler {

    static renderAllToDo(taskListObject) {
        taskListObject.getToDoList.forEach((toDo) => {
            this.renderToDo(toDo)
        })
    }

    //renders a 'toDoObject' on the webpage
    static renderToDo(toDoObject) {
        let newToDoDiv = this.createToDoHTMLDiv(toDoObject)
        DOMCache.mainContent.insertBefore(newToDoDiv, DOMCache.taskForm)
        this.resetFormValues()
    }

    static createToDoHTMLDiv(toDoObject) {
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'

        let toDoDiv = document.createElement('div')
        toDoDiv.className = 'to-do'
        toDoDiv.id = toDoObject.id

        let leftDiv = document.createElement('div')
        let objectTitleSpan = document.createElement('span')
        objectTitleSpan.innerHTML = toDoObject.title
        leftDiv.append(checkbox, objectTitleSpan)

        let rightDiv = document.createElement('div')
        let objectDueDateSpan = document.createElement('span')
        objectDueDateSpan.innerHTML = toDoObject.dueDate
        let prioritySpan = document.createElement('span')
        prioritySpan.innerHTML = toDoObject.priority
        let binImage = new Image();
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
        })

        return toDoDiv
    }

    static resetFormValues() {
        DOMCache.title.value = ""
        DOMCache.description.value = ""
        DOMCache.dueDate.value = ""
        DOMCache.priority.selectedIndex = 0;
    }
}