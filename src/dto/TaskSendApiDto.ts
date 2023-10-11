import type { SubTaskSendApiDto } from "./SubTaskSendApiDto";

export class TaskSendApiDto {
    title: String;
    completed: Boolean;
    editing: Boolean;
    subtasks: Array<SubTaskSendApiDto>

    constructor(title: String, completed: Boolean, editing: Boolean, subtask: Array<SubTaskSendApiDto>) {
        this.title = title;
        this.completed = completed;
        this.editing = editing;
        this.subtasks = subtask;
    }
}