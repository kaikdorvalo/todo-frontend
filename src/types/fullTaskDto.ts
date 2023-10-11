import type { FullSubTaskDto } from "./fullSubTaskDto";

export type FullTaskDto = {
    id: String | null;
    title: String;
    completed: Boolean;
    subtasks: Array<FullSubTaskDto>;
    editing: Boolean;
}