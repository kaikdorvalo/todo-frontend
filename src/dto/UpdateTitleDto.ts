export class UpdateTitleDto {
    id: String
    title: String;

    constructor(title: String, id: String) {
        this.title = title;
        this.id = id;
    }
}