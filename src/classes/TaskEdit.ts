import type { SubTaskGetApiDto } from "../dto/SubTaskGetApiDto";


export class TaskEdit {
    id: String;
    title: String;
    completed: Boolean;
    editing: Boolean;
    subtasks: Array<SubTaskGetApiDto>

    constructor(id: String, title: String, completed: Boolean, editing: Boolean, subtasks: Array<SubTaskGetApiDto>) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.editing = editing;
        this.subtasks = subtasks;
    }
}