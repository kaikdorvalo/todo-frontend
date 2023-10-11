import type { SubTaskClass } from "./subTaskClass";

export class TaskClass {
    id: String | null;
    title: String;
    completed: Boolean;
    subtasks: Array<SubTaskClass>;
    editing: Boolean;

    constructor(id: String, title: String, completed: Boolean, subtasks: Array<SubTaskClass>, editing: Boolean ) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.subtasks = subtasks;
        this.editing = editing;
    }
}