export class SubTaskAddingApiDto {
    tempId: Number;
    description: String;

    constructor(tempId: Number, description: String) {
        this.tempId = tempId;
        this.description = description;
    }
}