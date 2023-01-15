import { ToDo } from "./ToDo"
import Project from "./Project"
import DOMCache from "./DOMCache"
import DisplayHandler from "./DisplayHandler"

export default class DefaultTabs {
    static initDefaultProjects() {
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
    }

    static initDefaultTabs(project, projectController) {
        //defaults
        DOMCache.homeTab.addEventListener('click', () => {
            setCurrentProject(project.homeProject)
            renderProject(project.homeProject);
        })

        DOMCache.todayTab.addEventListener('click', () => {
            setCurrentProject(project.todayProject)
            renderProject(project.todayProject);
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
    }
}