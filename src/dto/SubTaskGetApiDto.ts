export class SubTaskGetApiDto {
    id: String;
    taskId: String;
    description: String;

    constructor(id: String, taskId: String, description: String) {
        this.id = id;
        this.taskId = taskId;
        this.description = description;
    }
}