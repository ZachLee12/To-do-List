export class ToDo {
    static instanceId = 0;

    constructor(title, description, dueDate, priority) {
        this.id = ToDo.instanceId
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.note = "no additional notes"
        ToDo.instanceId++;
    }   

    /**
     * @param {string} note
     */
    set setNote(note) {
        this.note = note
    }
}

