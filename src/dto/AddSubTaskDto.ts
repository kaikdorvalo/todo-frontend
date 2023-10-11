export class AddSubTaskDto {
    taskId: String;
    description: String;

    constructor (taskId: String, description: String) {
        this.taskId = taskId;
        this.description = description;
    }
}