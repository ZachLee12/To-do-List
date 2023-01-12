import './assets/styles/reset.css'
import './assets/styles/style.css'
import DOMCache from './DOMCache'
import DisplayHandler from './DisplayHandler';
import { ToDo } from './ToDo';
import { TaskList } from './TaskList';

//maybe export this module? 
const GUI = (function () {
    //initialize TaskList
    const taskList = new TaskList();
    //dummy values
    let test1 = new ToDo('Homework', 'Plz do homework', '2023-01-03', 'Low')
    let test2 = new ToDo('Hiking', 'Pilatus', '2023-08-03', 'High')
    taskList.addToList(test1)
    taskList.addToList(test2)
    DisplayHandler.renderAllToDo(taskList)
    
    //GUI Functions
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
        taskList.addToList(newToDo)
        DisplayHandler.renderToDo(newToDo)
    }

    function cancelButtonFunction() {
        DOMCache.taskForm.style.display = 'none'
        DOMCache.newTaskButton.style.display = 'block'
    }

})();








