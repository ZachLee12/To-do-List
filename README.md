# To-do-List (Listable.)
Live demo: https://zachlee12.github.io/To-do-List/

___Listable.___ is a To-Do List application that stores your ```To-Dos``` in a minimalistic and simplistic way. To get started, simply create a project and start adding tasks to your list! You can edit the details of your ```To-Dos``` by clicking on the components directly. 

This project stores data locally on your laptop via the ```localStorage``` JavaScript ```Object```. This means that even after refreshing the browser or closing the tab, your ```To-Dos``` data remains when you revisit the site! 


## ```localStorage```
```localStorage``` is a built-in JavaScript ```Object``` that stores key-value pairs in the ```JSON``` format, in the browser (similar to cookies). This allows data to persists in ```localStorage```, even after the browser is closed and allowing the user to access it the next time the user visits the website. 

## Using ```localStorage```
Data can be stored by using ```localStorage.setItem(key,value)```, and then retrieve using ```localStorage.getItem(key)```. 

This works a little differently for ```Objects```. It must first be converted to a ```JSON``` string format by using ```JSON.stringify()```, and then retrieved using ```JSON.parse()```.

The implementation of ```localStorage``` in this project is encapsulated in the ```Storage``` class:
```javascript
export default class Storage {
    constructor() {
        throw new Error('Cannot instantiate static class Storage')
    }

    static addProject(project) {
        localStorage.setItem(project.projectName, JSON.stringify(project))
    }

    static removeProject(project) {
        localStorage.removeItem(project.getProjectName)
    }

    static getProjectsArray() {
        let localProjects = []
        for (let keyValuePair of Object.entries(localStorage)) {
            let key = keyValuePair[0] //projectName, the key of the value
            let object = JSON.parse(localStorage.getItem(key))
            localProjects.push(object)
        }
        return localProjects;
    }
}
```

## Project Concept
This project applies Modular JavaScript where a module is responsible for a specific task and adhering to the [SOLID](https://en.wikipedia.org/wiki/SOLID) Principle. The modules are then bundled using [Webpack](https://webpack.js.org). 







