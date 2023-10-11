import { writable } from "svelte/store";
import { taskApi } from "../hooks/taskApi";
import type { FullTaskDto } from "../types/fullTaskDto";
import type { TaskClass } from "../dto/taskClass";

const api = taskApi();

export const tasks = writable<Array<TaskClass>>([]);

export const addTask = (task: TaskClass) => {
    tasks.update( (cur: Array<TaskClass>) => {
        const newTasks = [... cur, task];
        return newTasks;
    });
}

export const createNewTask = async (task: TaskClass) => {
    await api.createNewTask(task);
    loadTasks();
}

export const loadTasks = async () => {
    const result = await api.getTasks();
    tasks.set(result);
}

loadTasks();