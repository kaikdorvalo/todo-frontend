export class SubTaskClass {
    id: String | null;
    description: String;
    taskId: String | null;

    constructor(id: String | null, description: String, taskId: String | null) {
        this.id = id;
        this.description = description;
        this.taskId = taskId;
    }
}